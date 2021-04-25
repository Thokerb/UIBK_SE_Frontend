import { createAction, props } from '@ngrx/store';
import {Injectable} from '@angular/core';
import {GameTopic} from '../../api/dto/GameTopic';
import {Game, GameLobbyElement} from '../../api/dto/Game';

@Injectable()
export class GameAction {
  addGame = createAction(
    '[Game] Add Game',
    props<{ item: Game; }>()
  );

  addGames = createAction(
    '[Game] Add multiple Games',
    props<{ games: GameLobbyElement[]; }>()
  );

  getGames = createAction(
    '[Game] Get all Games'
  );

}

