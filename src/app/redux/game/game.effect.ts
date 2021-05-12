import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY, Observable} from 'rxjs';
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
      ofType(this.gameActions.getGames),
      switchMap(() => this.restService.getAllGamesForLobby()),
      switchMap(data => {
        return [
          this.gameActions.setGames({games: data.object}),
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

  getGame: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(this.gameActions.getCurrentGameFromAPI),
      switchMap(({gameId}) => this.restService.getGame(gameId)),
      switchMap(data => {
        console.log(data);
        if (data){
          return [
            this.gameActions.setCurrentGame({game: data.object}),
          ];
        }
        else{
          return [
            this.gameActions.setCurrentGame({game: null}),
          ];
        }

      })
    )
  );

  initGame: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(this.gameActions.init),
      switchMap(({gameId}) => this.restService.getGame(gameId)),
      switchMap(data => {
        console.log(data);
        if (data){
          return [
            this.gameActions.setCurrentGame({game: data.object}),
          ];
        }
        else{
          return EMPTY;
        }
      })
    )
  );
  initGameSection: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(this.gameActions.init),
      switchMap(({gameId}) => this.restService.getGameSections(gameId)),
      switchMap(data => {
        console.log(data);
        if (data && data.success){
          const section = data.object[data.object.length - 1];
          return [
            this.gameActions.setCurrentSection({section: section}),
          ];
        }
        else{
          return EMPTY;
        }
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
