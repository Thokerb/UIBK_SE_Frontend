import { createAction, props } from '@ngrx/store';

export const addItem = createAction(
  '[TODO] Add',
  props<{ item: string; }>()
);

export const clearList = createAction(
  '[TODO] Clear List'
);
