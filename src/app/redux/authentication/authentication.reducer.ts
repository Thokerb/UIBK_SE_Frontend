import {createReducer, on} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {AuthenticationAction} from './authentication.action';
import {REGISTER_STATUS} from '../../api/dto/Auth';


export interface AuthenticationState {
  authenticated: boolean;
  registered: boolean;
  registerError: REGISTER_ERROR;
  role: USER_ROLE;
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
  name: string;
  role: USER_ROLE;
}

export const initialState: AuthenticationState = {
  authenticated: false,
  registered: false,
  registerError: REGISTER_ERROR.NONE,
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
    on(this.authActions.saveUser, (state, {user}) => ({...state, user: user }) ),
    on(this.authActions.setRegisterError, (state, {error}) => ({ ...state, registerError: error})),
    on(this.authActions.setRegisterStatus, (state, {isRegistered}) => ({ ...state, registered: isRegistered})),


  );
}


