import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TodoSelector} from './todo/todo.selector';
import {AppReducer} from './AppReducer';
import {TodoReducer} from './todo/todo.reducer';
import {TodoAction} from './todo/todo.action';
import {AuthenticationSelector} from './authentication/authentication.selector';
import {AuthenticationReducer} from './authentication/authentication.reducer';
import {AuthenticationAction} from './authentication/authentication.action';
import {GametopicReducer} from './gameTopic/gametopic.reducer';
import {GametopicSelector} from './gameTopic/gametopic.selector';
import {GameTopicAction} from './gameTopic/gametopic.action';


@NgModule({
  providers: [AppReducer,
    TodoSelector, TodoReducer, TodoAction,
    AuthenticationSelector, AuthenticationReducer, AuthenticationAction,
    GametopicReducer, GametopicSelector, GameTopicAction
  ],
  declarations: [],
  imports: [
    CommonModule
  ],
})
export class ReduxModule { }
