import {createReducer, on} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {AuthenticationAction} from './authentication.action';
import {REGISTER_STATUS} from '../../api/dto/Auth';


export interface AuthenticationState {
  authenticated: boolean;
  registered: boolean;
  registerError: REGISTER_ERROR;
  roles: USER_ROLE[];
  user: User;
}

export enum REGISTER_ERROR {
  NONE,
  USERNAME_TAKEN,
  EMAILTAKEN
}

export enum USER_ROLE {
  NONE,
  USER,
  ADMIN
}

export interface User {
  id: string;
  username: string;
  email: string;
  roles: USER_ROLE[];
  accessToken: string;
  tokenType: string;
}


export const initialState: AuthenticationState = {
  authenticated: false,
  registered: false,
  roles: [USER_ROLE.NONE],
  registerError: REGISTER_ERROR.NONE,
  user: {
    username: null,
    roles: [USER_ROLE.NONE],
    accessToken: null,
    email: null,
    id: null,
    tokenType: null
  }
};

@Injectable()
export class AuthenticationReducer {

  constructor(private authActions: AuthenticationAction) {
  }

  reducer = createReducer(
    initialState,
    on(this.authActions.setAuthentication, (state, {isAuthenticated}) => ({ ...state, authenticated: isAuthenticated})),
    on(this.authActions.setRoles, (state, {roles}) => ({...state, roles: roles }) ),
    on(this.authActions.saveUser, (state, {user}) => ({...state, user: user }) ),
    on(this.authActions.setRegisterError, (state, {error}) => ({ ...state, registerError: error})),
    on(this.authActions.setRegisterStatus, (state, {isRegistered}) => ({ ...state, registered: isRegistered})),


  );
}


