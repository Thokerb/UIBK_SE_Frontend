import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {TodoSelector} from '../../redux/todo/todo.selector';
import {TodoReducer} from '../../redux/todo/todo.reducer';
import {TodoAction} from '../../redux/todo/todo.action';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  todo: Observable<string[]>;
  constructor(private store: Store, private todoSelector: TodoSelector, private todoActions: TodoAction) { }

  ngOnInit(): void {
    this.todo = this.store.select(this.todoSelector.selectAllTodos);
  }

  addItem(value: string): void {
    this.store.dispatch(this.todoActions.addItem({item: value}));
  }

}
