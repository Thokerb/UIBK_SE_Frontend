import {
    MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {TodoState} from './todo/todo.reducer';
import {AuthenticationState} from './authentication/authentication.reducer';
import {GameTopicState} from './gameTopic/gametopic.reducer';


export interface AppState {
  TodoState: TodoState;
  AuthenticationState: AuthenticationState;
  GameTopicState: GameTopicState;
}


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
