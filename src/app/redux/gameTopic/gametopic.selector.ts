/* tslint:disable:member-ordering */
import { createSelector } from '@ngrx/store';
import {AppState} from '../AppState';
import {Injectable} from '@angular/core';


@Injectable()
export class GametopicSelector {

  selectGameTopicState = (state: AppState) => state.GameTopicState;


  selectAllTopics = createSelector(
    this.selectGameTopicState,
    (state) => state.topics
  );



}
