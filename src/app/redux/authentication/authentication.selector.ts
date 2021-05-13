/* tslint:disable:member-ordering */
import {createSelector} from '@ngrx/store';
import {AppState} from '../AppState';
import {Injectable} from '@angular/core';
import {USER_ROLES} from '../../api/dto/UserManagement';


@Injectable()
export class AuthenticationSelector {

  selectAuth = (state: AppState) => state.AuthenticationState;

// just to see something more complex
  selectAuthStatus = createSelector(
    this.selectAuth,
    (State) => {
      return State.authenticated;
    }
  );

  selectRegisterStatus = createSelector(
    this.selectAuth,
    (State) => {
      return State.registered;
    }
  );

  selectRegisterError = createSelector(
    this.selectAuth,
    (State) => {
      return State.registerError;
    }
  );

  selectRoles = createSelector(
    this.selectAuth,
    (state) => {
      if (state.authenticated){
        return state.roles;
      }
    }
  );

  selectCurrentUser = createSelector(
    this.selectAuth,
    (state) => {
      if (state.authenticated){
        return state.user;
      }
      return undefined;
    }
  );

  selectLoginErrorStatus = createSelector(
    this.selectAuth,
    (State) => {
      return State.loginError;
    }
  );


}
