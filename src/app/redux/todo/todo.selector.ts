/* tslint:disable:member-ordering */
import { createSelector } from '@ngrx/store';
import {AppState} from '../AppState';
import {Injectable} from '@angular/core';


@Injectable()
export class TodoSelector {

  selectTodos = (state: AppState) => state.TodoState.todos;


  selectAllTodos = createSelector(
    this.selectTodos,
    (todos: string[]) => todos
  );

// just to see something more complex
  selectTodoStartingWithE = createSelector(
    this.selectTodos,
    (todos: string[]) => {
      return todos.filter(x => x.startsWith('E'));
    }
  );


}
