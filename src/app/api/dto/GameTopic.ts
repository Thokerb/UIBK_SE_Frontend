export interface GameTopic{
  topicId: number;
  description: string;
  topic: string;
  words: Set<string>;
}

export interface GameTopicDTO {
  topicId: number;
  description: string;
  topic: string;
  words: string[];
}
