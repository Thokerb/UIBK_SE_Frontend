import {User} from './UserManagement';

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
