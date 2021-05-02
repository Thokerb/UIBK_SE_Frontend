import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {GameAction} from '../../redux/game/game.action';
import {GameSelector} from '../../redux/game/game.selector';
import {CompleteGameDTO, GamePlayerDTO} from '../../api/dto/Game';
import * as _ from 'lodash';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  id: any;
  game: CompleteGameDTO;
  nimbusPlayer: string[];
  playerGroups;
  gameDisabled = true;

  constructor(private route: ActivatedRoute, private store: Store, private gameActions: GameAction, private gameSelector: GameSelector) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.store.select(this.gameSelector.selectCurrentGame).subscribe(next => {
      this.game = next;
      if (next){
        this.nimbusPlayer = next.gamePlayers.filter(x => !x.teamName).map(x => x.userName);
        this.playerGroups = _.groupBy(next.gamePlayers.filter(x => x.teamName), 'teamName');
        if (this.nimbusPlayer.length === 0 && next.gamePlayers.length >= next.gameNumberTeams * 2 ){
           this.gameDisabled = false;
        }
        else{
          this.gameDisabled = true;
        }
      }
    });
    this.store.dispatch(this.gameActions.getCurrentGameFromAPI({gameId: this.id}));

    }

}
