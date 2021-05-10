import {Word} from './Game';

export interface GameTopicResponse {
  success: boolean;
  description: string;
  object: Map<number, GameTopicDTO>;
}

export interface GameTopicDTO {
  topicId: number;
  description: string;
  topic: string;
  words: Word[];
}

export interface UploadGameTopicResponse {
  success: boolean;
  description: string;
  object: GameTopicDTO;
}
