import { createAction, props } from '@ngrx/store';
import {Injectable} from '@angular/core';
import {REGISTER_ERROR, User} from './authentication.reducer';
import {Credentials, RegisterValues} from '../../api/dto/Auth';
import {USER_ROLES} from '../../api/dto/UserManagement';

@Injectable()
export class AuthenticationAction {
  setAuthentication = createAction(
    '[Auth] Set Authentication',
    props<{ isAuthenticated: boolean; }>()
  );

  setRoles = createAction(
    '[Auth] Set Role',
    props<{ roles: USER_ROLES[]; }>()
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

  setLoginError = createAction(
    '[Auth] Set Login Error',
    props<{ status: boolean; }>()
  );
}

