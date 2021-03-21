import {createReducer, on} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {TodoAction} from './todo.action';


export interface TodoState {
  todos: string[];
}

export const initialState: TodoState = {
  todos: ['eat', 'sleep', 'party', 'repeat']
};

@Injectable()
export class TodoReducer{

  constructor(private todoActions: TodoAction) {
  }

  reducer = createReducer(
    initialState,
    on(this.todoActions.addItem, (state, {item}) => ({ ...state, todos: [...state.todos, item] })),
    on(this.todoActions.clearList, state => ({ ...state, todos: [] })),
  );
}


