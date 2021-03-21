import {Injectable} from '@angular/core';
import {TodoReducer} from './todo/todo.reducer';

@Injectable()
export class AppReducer{
  constructor(private todoReducerRedux: TodoReducer) {
  }

  public readonly todoReducer = this.todoReducerRedux.reducer;

}
