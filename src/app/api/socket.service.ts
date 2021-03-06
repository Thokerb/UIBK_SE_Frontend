import {Injectable, OnDestroy} from '@angular/core';
import {delay, filter, map, retryWhen, switchMap} from 'rxjs/operators';
import * as config from '../../config/appConfig.json';
import {Observable, of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AuthService} from './auth.service';
import {TokenStorageService} from '../security/token-storage.service';
import * as SockJS from 'sockjs-client';
import {CompatClient, Stomp, StompSubscription} from '@stomp/stompjs';
import {GameAction} from '../redux/game/game.action';
import {GenericResponse} from './rest-service.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnDestroy {
  private cubeSubscription: StompSubscription;
  private sectionSubscription: StompSubscription;
  private stompClient: CompatClient = null;
  private established = false;
  private gameSubscription: StompSubscription;
  constructor(
    private tokenService: TokenStorageService,
    private store: Store,
    private gameActions: GameAction
    ) {
  }


  connect(): void {
    console.log('connecting to websocket');
    const socket = new SockJS('http://localhost:8080/gkz-stomp-endpoint');
    this.stompClient = Stomp.over(socket);
    const stompClient = this.stompClient;
    // tslint:disable-next-line:variable-name
    const _this = this;
    this.stompClient.connect({'X-Authorization': 'Bearer ' + this.tokenService.getToken()}, function(frame): any {
      _this.established = true;
      console.log('Connected: ' + frame);
      _this.subscribeRoom();

    });


  }

  send(): void {
    this.stompClient.send(
      '/gkz/gameLobby',
      {},
      'hello world'
    );
  }
  subscribeCubes(): void{
    console.log(this.established);
    if (!this.stompClient || !this.established){
      console.warn('websockets not yet initialized');
      setTimeout( () => {
        this.subscribeCubes();
      }, 2000 );
      return;
    }
    if (this.cubeSubscription){
      this.unsubscribeCubes();
    }
    this.cubeSubscription = this.stompClient.subscribe('/topic/cubes', (hello) => {
      const response = JSON.parse(hello.body);
      console.log(response);
      this.store.dispatch(this.gameActions.setCubes({cubes: response}));
      console.log(hello.body);
    });
  }

  subscribeSections(): void{
    if (!this.stompClient || !this.established){
      console.warn('websockets not yet initialized');
      setTimeout( () => {
        this.subscribeSections();
      }, 2000 );
      return;
    }
    if (this.sectionSubscription){
      this.unsubscribeSection();
    }
    this.sectionSubscription = this.stompClient.subscribe('/topic/updateSection', (hello) => {
      const response = JSON.parse(hello.body) as GenericResponse;
      console.log(response);
      this.store.dispatch(this.gameActions.setCurrentSection({section: response.object}));
      console.log(hello.body);
    });
  }

  subscribeGame(): void{
    if (!this.stompClient || !this.established){
      console.warn('websockets not yet initialized');
      setTimeout( () => {
        this.subscribeGame();
      }, 2000 );
      return;
    }
    if (this.gameSubscription){
      this.unsubscribeGame();
    }
    this.gameSubscription = this.stompClient.subscribe('/topic/updateGame', (hello) => {
      const response: GenericResponse = JSON.parse(hello.body);
      console.log(response);
      this.store.dispatch(this.gameActions.setCurrentGame({game: response.object}));
      console.log(hello.body);
    });
  }

  unsubscribeCubes(): void{
    if (!this.cubeSubscription){
      console.warn('already unsubscribed from cubes');
      return;
    }
    this.cubeSubscription.unsubscribe();
    this.cubeSubscription = null;
  }

  unsubscribeSection(): void{
    if (!this.sectionSubscription){
      console.warn('already unsubscribed from cubes');
      return;
    }
    this.sectionSubscription.unsubscribe();
    this.cubeSubscription = null;
  }

  unsubscribeGame(): void{
    if (!this.gameSubscription){
      console.warn('already unsubscribed from cubes');
      return;
    }
    this.gameSubscription.unsubscribe();
    this.gameSubscription = null;
  }


  private subscribeRoom(): void{
    this.stompClient.subscribe('/topic/join', (hello) => {
      const response = JSON.parse(hello.body);
      console.log(response.object);
      this.store.dispatch(this.gameActions.setGames({games: response.object}));
      console.log(response);
    });
  }

  closeConnection(): void {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }
  ngOnDestroy(): void {
    this.closeConnection();
  }

}
