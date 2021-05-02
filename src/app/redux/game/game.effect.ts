import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AuthService} from '../../api/auth.service';
import {Action} from '@ngrx/store';
import {TokenStorageService} from '../../security/token-storage.service';
import {GameAction} from './game.action';
import {RestServiceService} from '../../api/rest-service.service';

@Injectable()
export class GameEffect {

  fetchGames: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(this.gameActions.getGames.type),
      switchMap(() => this.restService.getAllGamesForLobby()),
      switchMap(data => {
        return [
          this.gameActions.setGames({games: data}),
        ];
      })
    )
  );

  fetchCubes: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(this.gameActions.getCubes.type),
      switchMap(() => this.restService.getAllCubes()),
      switchMap(data => {
        return [
          this.gameActions.setCubes({cubes: data}),
        ];
      })
    )
  );


  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private gameActions: GameAction,
    private tokenStorage: TokenStorageService,
    private restService: RestServiceService,
  ) {}
}
