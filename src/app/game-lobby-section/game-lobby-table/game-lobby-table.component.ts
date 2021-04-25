import { Component, OnInit } from '@angular/core';
import {Game, GameLobbyElement} from '../../api/dto/Game';
import {Store} from '@ngrx/store';
import {GameSelector} from '../../redux/game/game.selector';
import {GameAction} from '../../redux/game/game.action';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game-lobby-table',
  templateUrl: './game-lobby-table.component.html',
  styleUrls: ['./game-lobby-table.component.css']
})
export class GameLobbyTableComponent implements OnInit {
  games: GameLobbyElement[];

  constructor(private store: Store, private gameSelector: GameSelector, private gameAction: GameAction, private router: Router) {
    store.select(gameSelector.selectAllGames).subscribe(next => this.games = next);
  }

  ngOnInit(): void {
    this.store.dispatch(this.gameAction.getGames());
  }

  join(game: GameLobbyElement): void {
    console.error('joining game, not yet implemented', game);
    // TODO: join game
    this.router.navigateByUrl('/game/' + game.gameID);
  }
}
