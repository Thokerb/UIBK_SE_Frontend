export interface GameTopic{
  topicId: number;
  description: string;
  topic: string;
  words: Set<string>;
}

export interface GameTopicResponse {
  success: boolean;
  description: string;
  object: Map<number, GameTopic>;
}

export interface GameTopicDTO {
  topicId: number;
  description: string;
  topic: string;
  words: string[];
}
