import {Component, NgZone, OnInit} from '@angular/core';
import {Game, GameLobbyElement} from '../../api/dto/Game';
import {Store} from '@ngrx/store';
import {GameSelector} from '../../redux/game/game.selector';
import {GameAction} from '../../redux/game/game.action';
import {Router} from '@angular/router';
import {RestServiceService} from '../../api/rest-service.service';
import {AuthenticationSelector} from '../../redux/authentication/authentication.selector';
import {User} from '../../redux/authentication/authentication.reducer';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-game-lobby-table',
  templateUrl: './game-lobby-table.component.html',
  styleUrls: ['./game-lobby-table.component.css']
})
export class GameLobbyTableComponent implements OnInit {
  games: GameLobbyElement[];
  user: User;

  constructor(private store: Store,
              private gameSelector: GameSelector,
              private gameAction: GameAction,
              private router: Router,
              private authSelector: AuthenticationSelector,
              private zone: NgZone,
              private messageService: MessageService,
              private restService: RestServiceService) {
    store.select(gameSelector.selectAllGames).subscribe(next => this.games = next);
    store.select(authSelector.selectCurrentUser).subscribe(next => this.user = next);
  }

  ngOnInit(): void {
    this.store.dispatch(this.gameAction.getGames());
  }

  join(game: GameLobbyElement): void {
    this.restService.joinGame(this.user.username, game.gameID).subscribe(next => {
      if (next && next.success){
        this.zone.run(() => {
          this.router.navigateByUrl('/game/' + game.gameID);
        });
      }
      else{
        console.log(next);
        // TODO: next.description
        this.messageService.add({severity: 'error', summary: 'Spielbeitritt', detail: `Spielbeitritt nicht möglich. ${next.description}`});

      }
    },
      error => {
        console.error(error);
        this.messageService.add({severity: 'error', summary: 'Spielbeitritt', detail: `Spielbeitritt nicht möglich.`});

      });
  }
}
