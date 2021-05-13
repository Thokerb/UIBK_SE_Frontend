import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {TodoSelector} from '../../redux/todo/todo.selector';
import {TodoReducer} from '../../redux/todo/todo.reducer';
import {TodoAction} from '../../redux/todo/todo.action';
import {RestServiceService} from '../../api/rest-service.service';
import {SocketService} from '../../api/socket.service';
import {Router} from '@angular/router';
import {AuthenticationAction} from "../../redux/authentication/authentication.action";
import {GameAction} from "../../redux/game/game.action";
import {Game} from "../../api/dto/Game";

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game-page.component.html',
  styleUrls: ['./create-game-page.component.css']
})
export class CreateGamePageComponent implements OnInit {

  todo: Observable<string[]>;
  username: string;
  roomID: string;
  constructor(private store: Store,
              private todoSelector: TodoSelector,
              private todoActions: TodoAction,
              private restService: RestServiceService,
              private webSocket: SocketService,
              private router: Router,
              private gameAction: GameAction
              ) { }

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
      gameId: 1,
      gameName: '',
      gameMaxPoints: 100,
      gamePlayers: [],
      gameTopics: [],
      gameNumberTeams: 2
    };
    this.store.dispatch(this.gameAction.addGame({item: game}));
  }

  onCancelBtn(ev: MouseEvent): void {
    ev.preventDefault();
    this.router.navigateByUrl('/dashboard');
  }

  sendToSocket(): void {
    this.webSocket.send();
  }
}
