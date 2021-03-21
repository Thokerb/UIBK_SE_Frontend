import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {TodoSelector} from '../../redux/todo/todo.selector';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  todo: Observable<string[]>;
  constructor(private store: Store, private todoSelector: TodoSelector) { }

  ngOnInit(): void {
    this.todo = this.store.select(this.todoSelector.selectAllTodos);
  }

}
