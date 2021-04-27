import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {GameAction} from '../../redux/game/game.action';
import {GameSelector} from '../../redux/game/game.selector';
import {Game} from '../../api/dto/Game';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  id: any;
  game: Game;

  constructor(private route: ActivatedRoute, private store: Store, private gameActions: GameAction, private gameSelector: GameSelector) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.store.select(this.gameSelector.selectCurrentGame).subscribe(next => this.game = next);
    this.store.dispatch(this.gameActions.getCurrentGameFromAPI({gameId: this.id}));

    }

}
