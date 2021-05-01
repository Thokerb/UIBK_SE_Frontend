import {Injectable, OnDestroy} from '@angular/core';
import {delay, filter, map, retryWhen, switchMap} from 'rxjs/operators';
import * as config from '../../config/appConfig.json';
import {Observable, of} from 'rxjs';
import {select} from '@ngrx/store';
import {AuthService} from './auth.service';
import {TokenStorageService} from '../security/token-storage.service';
import * as SockJS from 'sockjs-client';
import {CompatClient, Stomp} from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnDestroy{
  private stompClient: CompatClient = null;
  constructor(private tokenService: TokenStorageService) {
  }


  connect(): void {
    const socket = new SockJS('http://localhost:8080/gkz-stomp-endpoint');
    this.stompClient = Stomp.over(socket);
    const stompClient = this.stompClient;
    // tslint:disable-next-line:variable-name
    const _this = this;
    this.stompClient.connect({'X-Authorization': 'Bearer ' + this.tokenService.getToken()}, function(frame): any {
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


  private subscribeRoom(): void{
    this.stompClient.subscribe('/topic/join', (hello) => {
      console.log(hello.body);
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
