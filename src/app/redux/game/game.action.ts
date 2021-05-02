import { createAction, props } from '@ngrx/store';
import {Injectable} from '@angular/core';
import {GameTopic} from '../../api/dto/GameTopic';
import {Game, GameLobbyElement} from '../../api/dto/Game';
import {Cube} from '../../api/dto/Cube';

@Injectable()
export class GameAction {
  addGame = createAction(
    '[Game] Add Game',
    props<{ item: Game; }>()
  );

  setGames = createAction(
    '[Game] Set Games',
    props<{ games: GameLobbyElement[]; }>()
  );

  getGames = createAction(
    '[Game] Get all Games'
  );

  getCubes = createAction(
    '[Game] Get all Cubes'
  );

  setCubes = createAction(
    '[Game] Set Cubes in Redux',
  props<{ cubes: Cube[]; }>()

);

}

