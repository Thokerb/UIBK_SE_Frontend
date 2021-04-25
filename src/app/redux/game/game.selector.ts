/* tslint:disable:member-ordering */
import { createSelector } from '@ngrx/store';
import {AppState} from '../AppState';
import {Injectable} from '@angular/core';


@Injectable()
export class GameSelector {

  selectGameState = (state: AppState) => state.GameState;


  selectAllGames = createSelector(
    this.selectGameState,
    (state) => state.lobbyGames
  );



}
