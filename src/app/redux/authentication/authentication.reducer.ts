import {createReducer, on} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {AuthenticationAction} from './authentication.action';


export interface AuthenticationState {
  authenticated: boolean;
  role: USER_ROLE;
  user: User;
}

export enum USER_ROLE {
  NONE,
  USER,
  ADMIN
}

export interface User {
  name: string;
  role: USER_ROLE;
}

export const initialState: AuthenticationState = {
  authenticated: false,
  role: USER_ROLE.NONE,
  user: {
    name: null,
    role: USER_ROLE.NONE
  }
};

@Injectable()
export class AuthenticationReducer {

  constructor(private authActions: AuthenticationAction) {
  }

  reducer = createReducer(
    initialState,
    on(this.authActions.setAuthentication, (state, {isAuthenticated}) => ({ ...state, authenticated: isAuthenticated})),
    on(this.authActions.setRole, (state, {role}) => ({...state, role: role }) ),
    on(this.authActions.saveUser, (state, {user}) => ({...state, user: user }) )
  );
}


