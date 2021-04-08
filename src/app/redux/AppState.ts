import {
    MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {TodoState} from './todo/todo.reducer';
import {AuthenticationState} from './authentication/authentication.reducer';


export interface AppState {
  TodoState: TodoState;
  AuthenticationState: AuthenticationState;
}


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
