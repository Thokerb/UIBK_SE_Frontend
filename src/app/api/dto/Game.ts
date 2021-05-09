import {User, USER_ROLES} from './UserManagement';
import {GameTopicDTO} from './GameTopic';

export interface GameDTO {
  id: string;
  name: string;
}

export interface Game {
  gameId: number;
  gameName: string;
  gameNumberTeams: number;
  gameMaxPoints: number;
  gameTopics: string[];
  gamePlayers: User[];
}

export interface GameLobbyElement{
  gameID: number;
  gameName: string;
  gameTopics: string[];
  gameCurrentPlayers: number;
  gameMaxPlayers: number;
}

export interface JoinGameResponse{
  success: boolean;
  description: string;
  object: Game;
}

export interface GetGameResponse{
  success: boolean;
  description: string;
  object: CompleteGameDTO;
}

export interface Teams {
  teamId: number;
  teamName: string;
  players: PlayerDTO[];
  score: number;
}

export interface CompleteGameDTO{
  active: boolean;
  gameId: number;
  gameName: string;
  gameNumberTeams: number;
  gameMaxPoints: number;
  gameTopics: GameTopicDTO[];
  gamePlayers: PlayerDTO[];
  gameTeams: Teams[];
}


export interface GameLobbyResponse{
  success: boolean;
  description: string;
  object: GameLobbyElement[];
}

export interface PlayerDTO {
  email: string;
  enabled: boolean;
  firstName: string;
  gender: Gender;
  id: string;
  lastName: string;
  new: boolean;
  phone: string;
  roles: USER_ROLES[];
  username: string;
}

export enum Gender {
  "MALE",
  "FEMALE",
  "OTHER"
}
