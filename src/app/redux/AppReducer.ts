import {Injectable} from '@angular/core';
import {TodoReducer} from './todo/todo.reducer';
import {AuthenticationReducer} from './authentication/authentication.reducer';

@Injectable()
export class AppReducer{
  constructor(private todoReducerRedux: TodoReducer, private authReducerRedux: AuthenticationReducer) {
  }

  public readonly todoReducer = this.todoReducerRedux.reducer;
  public readonly authReducer = this.authReducerRedux.reducer;
}
