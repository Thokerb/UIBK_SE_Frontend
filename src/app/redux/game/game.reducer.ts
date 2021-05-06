import {createReducer, on} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {GameTopic} from '../../api/dto/GameTopic';
import {GameAction} from './game.action';
import {CompleteGameDTO, Game, GameLobbyElement} from '../../api/dto/Game';


export interface GameState {
  games: Game[];
  lobbyGames: GameLobbyElement[];
  currentGame: CompleteGameDTO;
}

export const initialState: GameState = {
  games: [],
  lobbyGames: [],
  currentGame: null
};

@Injectable()
export class GameReducer {

  constructor(private gameAction: GameAction) {
  }

  reducer = createReducer(
    initialState,
    on(this.gameAction.addGame, (state, {item}) => ({ ...state, games: [...state.games, item] })),
    on(this.gameAction.setGames, (state, {games}) => ({ ...state, lobbyGames: [...games.filter(x => x.gameID !== 0)] })),
    on(this.gameAction.setCurrentGame, (state, {game}) => ({ ...state, currentGame: game})),

  );
}


