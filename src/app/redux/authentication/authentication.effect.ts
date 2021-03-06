import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {AuthService} from '../../api/auth.service';
import {AuthenticationAction} from './authentication.action';
import {Action} from '@ngrx/store';
import {TokenStorageService} from '../../security/token-storage.service';
import {REGISTER_STATUS} from '../../api/dto/Auth';
import {REGISTER_ERROR} from './authentication.reducer';
import {SocketService} from '../../api/socket.service';

@Injectable()
export class AuthenticationEffects {

  login: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(this.authActions.login.type),
      switchMap(({credentials}) => this.authService.login(credentials)),
      switchMap(data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.socketService.connect();

        return [
          this.authActions.setAuthentication({isAuthenticated: true}),
          this.authActions.saveUser(data.user),
          this.authActions.saveUser({user: data}),
          this.authActions.setRoles({roles: data.roles})
        ];
      })
    )
  );

  login2: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(this.authActions.login.type),
      switchMap(({credentials}) => this.authService.login(credentials).pipe(
        map((pizza) => this.authActions.setLoginError({status: false})),
        catchError(() => of(this.authActions.setLoginError({status: true})))
      ))
    )
  );

  register: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(this.authActions.register.type),
      switchMap(({credentials}) => this.authService.register(credentials)),
      switchMap(response => {

        const respType = REGISTER_STATUS[response.responseType];
        switch (respType){
          case REGISTER_STATUS.EMAILEXISTS: {
            return [this.authActions.setRegisterStatus({isRegistered: false}),
              this.authActions.setRegisterError({error: REGISTER_ERROR.EMAILTAKEN})];
          }
          case REGISTER_STATUS.USEREXISTS: {
            return [this.authActions.setRegisterStatus({isRegistered: false}),
              this.authActions.setRegisterError({error: REGISTER_ERROR.USERNAME_TAKEN})];
          }
          case REGISTER_STATUS.USERCREATED: {
            return [this.authActions.setRegisterStatus({isRegistered: true}),
              this.authActions.setRegisterError({error: REGISTER_ERROR.NONE})];
          }
        }
        return [this.authActions.setRegisterStatus({isRegistered: true})];



      })
    )
  );


  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private authActions: AuthenticationAction,
    private tokenStorage: TokenStorageService,
    private socketService: SocketService
  ) {}
}
