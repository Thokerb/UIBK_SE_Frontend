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

  selectRole = createSelector(
    this.selectAuth,
    (state) => {
      if (state.authenticated){
        return state.role;
      }
      return USER_ROLE.NONE;
    }
  );


}
