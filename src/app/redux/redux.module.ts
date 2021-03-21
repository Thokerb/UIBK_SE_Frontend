import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TodoSelector} from './todo/todo.selector';
import {AppReducer} from './AppReducer';
import {TodoReducer} from './todo/todo.reducer';
import {TodoAction} from './todo/todo.action';


@NgModule({
  providers: [AppReducer,
    TodoSelector, TodoReducer, TodoAction],
  declarations: [],
  imports: [
    CommonModule
  ],
})
export class ReduxModule { }
