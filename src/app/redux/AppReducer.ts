import {Injectable} from '@angular/core';
import {TodoReducer} from './todo/todo.reducer';
import {AuthenticationReducer} from './authentication/authentication.reducer';
import {GametopicReducer} from './gameTopic/gametopic.reducer';
import {GameReducer} from './game/game.reducer';

@Injectable()
export class AppReducer{
  constructor(private todoReducerRedux: TodoReducer,
              private authReducerRedux: AuthenticationReducer,
              private gameTopicReducerRedux: GametopicReducer,
              private gameReducerRedux: GameReducer
              ) {
  }

  public readonly todoReducer = this.todoReducerRedux.reducer;
  public readonly authReducer = this.authReducerRedux.reducer;
  public readonly gameTopicReducer = this.gameTopicReducerRedux.reducer;
  public readonly gameReducer = this.gameReducerRedux.reducer;

}
