import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {TodoSelector} from '../../redux/todo/todo.selector';
import {TodoReducer} from '../../redux/todo/todo.reducer';
import {TodoAction} from '../../redux/todo/todo.action';
import {RestServiceService} from '../../api/rest-service.service';
import {SocketService} from '../../api/socket.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  todo: Observable<string[]>;
  username: string;
  roomID: string;
  constructor(private store: Store,
              private todoSelector: TodoSelector,
              private todoActions: TodoAction,
              private restService: RestServiceService,
              private webSocket: SocketService,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.todo = this.store.select(this.todoSelector.selectAllTodos);
  }

  onLobbyBtn(): void {
    this.router.navigateByUrl('/gamelobby');
  }

  onCreateGameBtn(): void {
    this.router.navigateByUrl('/createGame');
  }

  onPlayerProfileBtn(): void {
    this.router.navigateByUrl('/profile');
  }

  openCubeSite(): void {
    this.router.navigateByUrl('/cube');
  }
  sendToSocket(): void {
    this.webSocket.send();
  }

  openCubeSite(): void {
    // sooo much work
    this.router.navigateByUrl('/cube');
  }
}
