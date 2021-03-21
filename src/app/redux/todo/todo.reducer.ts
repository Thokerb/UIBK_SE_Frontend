import * as todoActions from './todo.action';
import {Action, createReducer, on, State} from '@ngrx/store';


export interface TodoState {
  todos: string[];
}

export const initialState: TodoState = {
  todos: ['eat', 'sleep', 'party', 'repeat']
};

const scoreboardReducer = createReducer(
  initialState,
  on(todoActions.addItem, (state, {item}) => ({ ...state, todos: [...state.todos, item] })),
  on(todoActions.clearList, state => ({ ...state, todos: [] })),
);

export function reducer(state: TodoState | undefined, action: Action): TodoState {
  return scoreboardReducer(state, action);
}
