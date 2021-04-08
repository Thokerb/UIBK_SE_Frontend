import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {EMPTY, Observable, of, pipe} from 'rxjs';
import {map, mergeMap, catchError, switchMap} from 'rxjs/operators';
import {AuthService} from '../../api/auth.service';
import {AuthenticationAction} from './authentication.action';
import {Action} from '@ngrx/store';
import {TokenStorageService} from '../../security/token-storage.service';

@Injectable()
export class AuthenticationEffects {

  GetToDos$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(this.authActions.login.type),
      switchMap(action => this.authService.login(action)),
      switchMap(data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        return [
          this.authActions.setAuthentication({isAuthenticated: true}),
          this.authActions.saveUser(data.user)
        ];
      })
    )
  );


  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private authActions: AuthenticationAction,
    private tokenStorage: TokenStorageService
  ) {}
}
