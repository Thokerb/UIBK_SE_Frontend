import { createAction, props } from '@ngrx/store';
import {Injectable} from '@angular/core';

@Injectable()
export class TodoAction{
  addItem = createAction(
    '[TODO] Add',
    props<{ item: string; }>()
  );

   clearList = createAction(
    '[TODO] Clear List'
  );

}

