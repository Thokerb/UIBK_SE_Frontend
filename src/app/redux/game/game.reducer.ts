import {createReducer, on} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {GameAction} from './game.action';
import {CompleteGameDTO, Game, GameLobbyElement, GameSection} from '../../api/dto/Game';
import {Cube} from '../../api/dto/Cube';



export interface GameState {
  games: Game[];
  lobbyGames: GameLobbyElement[];
  currentGame: CompleteGameDTO;
  cubes: Cube[];
  currentSection: GameSection;
}

export const initialState: GameState = {
  games: [],
  lobbyGames: [],
  currentGame: null,
  currentSection: null,
  cubes: []
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
    on(this.gameAction.setCurrentSection, (state, {section}) => ({ ...state, currentSection: section})),
    on(this.gameAction.setCubes, (state, {cubes}) => ({ ...state, cubes: cubes })),


  );
}


