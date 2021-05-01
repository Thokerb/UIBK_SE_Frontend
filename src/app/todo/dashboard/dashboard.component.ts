import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {TodoSelector} from '../../redux/todo/todo.selector';
import {TodoReducer} from '../../redux/todo/todo.reducer';
import {TodoAction} from '../../redux/todo/todo.action';
import {RestServiceService} from '../../api/rest-service.service';
import {SocketService} from '../../api/socket.service';

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
              private webSocket: SocketService) { }

  ngOnInit(): void {
    this.webSocket.connect();
    this.todo = this.store.select(this.todoSelector.selectAllTodos);
  }

  addItem(value: string): void {
    this.store.dispatch(this.todoActions.addItem({item: value}));
  }

  notYetImplemented(): void {
    console.warn('Not yet implemented');
  }
  sendToSocket(): void {
    this.webSocket.send();
  }
}
