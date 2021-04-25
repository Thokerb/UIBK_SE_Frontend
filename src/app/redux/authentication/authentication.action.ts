import { createAction, props } from '@ngrx/store';
import {Injectable} from '@angular/core';
import {REGISTER_ERROR, User, USER_ROLE} from './authentication.reducer';
import {Credentials, RegisterValues} from '../../api/dto/Auth';

@Injectable()
export class AuthenticationAction {
  setAuthentication = createAction(
    '[Auth] Set Authentication',
    props<{ isAuthenticated: boolean; }>()
  );

  setRoles = createAction(
    '[Auth] Set Role',
    props<{ roles: USER_ROLE[]; }>()
  );

  saveUser = createAction(
    '[Auth] Save User',
    props<{ user: User; }>()
  );

  login = createAction(
    '[Auth] Login',
    props<{ credentials: Credentials; }>()
  );

  register = createAction(
    '[Auth] Register',
    props<{ credentials: RegisterValues; }>()
  );

  setRegisterStatus = createAction(
    '[Auth] Set Registration Status',
    props<{ isRegistered: boolean; }>()
  );

  setRegisterError = createAction(
    '[Auth] Set Registration Error',
    props<{ error: REGISTER_ERROR; }>()
  );
}

