/* tslint:disable:member-ordering */
import {createSelector} from '@ngrx/store';
import {AppState} from '../AppState';
import {Injectable} from '@angular/core';
import {USER_ROLE} from './authentication.reducer';


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
      return USER_ROLE.NONE;
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


}
