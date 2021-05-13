import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {TodoSelector} from '../../redux/todo/todo.selector';
import {TodoReducer} from '../../redux/todo/todo.reducer';
import {TodoAction} from '../../redux/todo/todo.action';
import {RestServiceService} from '../../api/rest-service.service';
import {SocketService} from '../../api/socket.service';
import {Router} from '@angular/router';
import {AuthenticationAction} from '../../redux/authentication/authentication.action';
import {GameAction} from '../../redux/game/game.action';
import {Game} from '../../api/dto/Game';
import * as config from '../../../config/appConfig.json';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game-page.component.html',
  styleUrls: ['./create-game-page.component.css']
})
export class CreateGamePageComponent implements OnInit {

  todo: Observable<string[]>;
  username: string;
  roomID: string;

  readonly MIN_NUM_TEAMS = config.minNumTeams;
  readonly MAX_NUM_TEAMS = config.maxNumTeams;

  gameName: string;
  maxPoints: number;
  numTeams: number;
  gameTopics: string[];
  constructor(private store: Store,
              private todoSelector: TodoSelector,
              private todoActions: TodoAction,
              private restService: RestServiceService,
              private webSocket: SocketService,
              private router: Router,
              private gameAction: GameAction
              ) {
    this.numTeams = this.MIN_NUM_TEAMS;
    this.maxPoints = 100;
  }

  ngOnInit(): void {
    this.todo = this.store.select(this.todoSelector.selectAllTodos);
  }

  onCreateBtn(ev: MouseEvent): void {
    ev.preventDefault();
    this.createGame();
  }

  createGame(): void {
    console.warn('Not yet implemented');
    const game: Game = {
      gameId: 1, // TODO ?
      gameName: this.gameName,
      gameMaxPoints: this.maxPoints,
      gamePlayers: [],
      gameTopics: this.gameTopics,
      gameNumberTeams: this.numTeams
    };
    this.store.dispatch(this.gameAction.addGame({item: game}));
    // TODO create game, topic, cube, player
  }

  onCancelBtn(ev: MouseEvent): void {
    ev.preventDefault();
    this.router.navigateByUrl('/dashboard');
  }

  sendToSocket(): void {
    this.webSocket.send();
  }
}
