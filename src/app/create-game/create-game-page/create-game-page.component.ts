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
import {SliderModule} from 'primeng/slider';


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
    this.gameTopics = [];
  }

  ngOnInit(): void {
    this.todo = this.store.select(this.todoSelector.selectAllTodos);
  }

  onCreateBtn(ev: MouseEvent): void {
    ev.preventDefault();
    this.createGame();
  }

  createGame(): void {
    console.log(this.maxPoints);
    const game: Game | any = {
      gameId: '1', // doesn't matter
      gameName: this.gameName,
      gameMaxPoints: this.maxPoints,
      gamePlayers: [],
      gameTopics: this.gameTopics,
      gameNumberTeams: this.numTeams,
      gameTeams: []
    };
    // 1. Create game
    console.log('creating game: ' + JSON.stringify(game));
    this.restService.createGame(game).subscribe(next => console.log(next));
    console.warn('Not yet implemented');
    // TODO 2. Topic?
    // TODO 3. Cube
    // TODO 4. Join current player
  }

  onCancelBtn(ev: MouseEvent): void {
    ev.preventDefault();
    this.router.navigateByUrl('/dashboard');
  }

  sendToSocket(): void {
    this.webSocket.send();
  }
}
