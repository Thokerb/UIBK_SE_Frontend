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
