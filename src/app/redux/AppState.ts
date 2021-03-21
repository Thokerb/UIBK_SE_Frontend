import {
    MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {TodoState} from './todo/todo.reducer';


export interface AppState {
  TodoState: TodoState;
}


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
