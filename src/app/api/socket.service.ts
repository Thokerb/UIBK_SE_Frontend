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

    this.stompClient.connect({"X-Authorization": 'Bearer ' + this.tokenService.getToken()}, function(frame): any {
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/hi', (hello) => {
        console.log(hello.body);
      });

    });

  }

  send(): void {
    this.stompClient.send(
      '/gkz/hello',
      {},
      'hello world'
    );
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
