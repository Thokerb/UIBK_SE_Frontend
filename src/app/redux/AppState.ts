import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {reducer, TodoState} from './todo/todo.reducer';


export interface AppState {
  TodoState: TodoState;
}

export const reducers: ActionReducerMap<AppState> = {
  TodoState: reducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
