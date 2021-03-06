
export interface StatsResponse {
  success: boolean;
  description: string;
  object: Stats;
}

export interface Stats {
  userId: string;
  totalGuesses: number;
  totalTimeForAllGuesses: number;
  topics: Array<TopicStats>;
  userTimesPlayed: any[];
}

export interface TopicStats {
  topicId: number;
  topic: string;
  maxPoints: number;
  reachedPoints: number;
  totalGuesses: number;
  timeForAllGuesses: number;
}
