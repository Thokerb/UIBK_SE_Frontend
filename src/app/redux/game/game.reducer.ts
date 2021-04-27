import {createReducer, on} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {GameTopic} from '../../api/dto/GameTopic';
import {GameAction} from './game.action';
import {Game, GameLobbyElement} from '../../api/dto/Game';


export interface GameState {
  games: Game[];
  lobbyGames: GameLobbyElement[];
  currentGame: Game;
}

export const initialState: GameState = {
  games: [{gameId: 100, gameName: 'Admins Game', gameTopics: ['essen'], gameMaxPoints: 20, gameNumberTeams: 8 , gamePlayers: []}],
  lobbyGames: [{gameID: 100, gameName: 'Admins Game', gameMaxPlayers: 8, gameCurrentPlayers: 0, gameTopics: []}],
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


