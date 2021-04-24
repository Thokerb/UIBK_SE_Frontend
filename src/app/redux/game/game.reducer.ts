import {createReducer, on} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {GameTopic} from '../../api/dto/GameTopic';
import {GameAction} from './game.action';
import {Game} from '../../api/dto/Game';


export interface GameState {
  games: Game[];
}

export const initialState: GameState = {
  games: [{gameId: 100, gameName: "Admins Game", gameTopics: ["essen"], gameMaxPoints: 20, gameNumberTeams: 8 , gamePlayers: []}]
};

@Injectable()
export class GameReducer {

  constructor(private gameAction: GameAction) {
  }

  reducer = createReducer(
    initialState,
    on(this.gameAction.addGame, (state, {item}) => ({ ...state, games: [...state.games, item] })),
    on(this.gameAction.addGames, (state, {games}) => ({ ...state, games: [...state.games, ...games] })),

  );
}


