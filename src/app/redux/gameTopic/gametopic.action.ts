import { createAction, props } from '@ngrx/store';
import {Injectable} from '@angular/core';
import {GameTopicDTO} from '../../api/dto/GameTopic';

@Injectable()
export class GameTopicAction{
  addTopic = createAction(
    '[GameTopic] Add Topic',
    props<{ item: GameTopicDTO; }>()
  );

}

