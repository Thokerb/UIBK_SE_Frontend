import {createReducer, on} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {GameTopicAction} from './gametopic.action';
import {GameTopic} from '../../api/dto/GameTopic';


export interface GameTopicState {
  topics: GameTopic[];
}

export const initialState: GameTopicState = {
  topics: []
};

@Injectable()
export class GametopicReducer {

  constructor(private gameTopicAction: GameTopicAction) {
  }

  reducer = createReducer(
    initialState,
    on(this.gameTopicAction.addTopic, (state, {item}) => ({ ...state, topics: [...state.topics, item] })),
  );
}


