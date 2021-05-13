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
  selector: 'app-stats',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.css']
})
export class StatsPageComponent implements OnInit {

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

  // TODO page only accessible after auth / login
  // TODO get and display user profile info (id, username, email, roles, etc.)
  ngOnInit(): void {
    this.todo = this.store.select(this.todoSelector.selectAllTodos);
  }

  sendToSocket(): void {
    this.webSocket.send();
  }
}
