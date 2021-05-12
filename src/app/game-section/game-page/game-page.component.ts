import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {GameAction} from '../../redux/game/game.action';
import {GameSelector} from '../../redux/game/game.selector';
import {CompleteGameDTO, PlayerDTO, Teams} from '../../api/dto/Game';
import * as _ from 'lodash';
import {User} from '../../redux/authentication/authentication.reducer';
import {AuthenticationSelector} from '../../redux/authentication/authentication.selector';
import {RestServiceService} from '../../api/rest-service.service';
import {SocketService} from '../../api/socket.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit, OnDestroy {
  id: any;
  game: CompleteGameDTO;
  nimbusPlayer: string[];
  gameDisabled = true;
  currentUser: User;
  teams: Teams[];
  gameplay = false;

  constructor(private route: ActivatedRoute,
              private store: Store,
              private gameActions: GameAction,
              private gameSelector: GameSelector,
              private router: Router,
              private socketService: SocketService,
              private restService: RestServiceService,
              private authSelector: AuthenticationSelector) { }

  ngOnDestroy(): void {
        this.socketService.unsubscribeGame();
    }

  ngOnInit(): void {
    this.socketService.subscribeGame();
    this.socketService.subscribeSections();
    this.store.select(this.authSelector.selectCurrentUser).subscribe(next => this.currentUser = next);
    this.id = this.route.snapshot.paramMap.get('id');
    this.store.select(this.gameSelector.selectCurrentGame).subscribe(next => {
      this.game = next;
      console.log(next);
      if (next) {
        if(next.started){
          this.router.navigateByUrl('/gameplay/' + this.game.gameId);
        }
        console.log(next);
        this.teams = _.clone(next.gameTeams).sort((x, y) => x.teamName.localeCompare(y.teamName));
        const playerInTeams: PlayerDTO[] = next.gameTeams.map(x => x.players).reduce((acc, val) => acc.concat(val), []);
        this.nimbusPlayer = next.gamePlayers.filter(x => !playerInTeams.map(y => y.id).includes(x.id)).map(x => x.username);
        console.log(this.nimbusPlayer);
        if (this.nimbusPlayer.length === 0 && next.gamePlayers.length >= next.gameNumberTeams * 1) {
          this.gameDisabled = false;
        } else {
          this.gameDisabled = true;
        }
      }
    });
    this.store.dispatch(this.gameActions.getCurrentGameFromAPI({gameId: this.id}));

  }

  joinTeam(teamId: number): void {
    if (!this.currentUser){
      console.error('you are not a verified user!');
    }
    this.restService.joinTeam(this.game.gameId, teamId, this.currentUser.id).subscribe(next => console.log(next));

  }

  removeTeam(): void {
    this.restService.removePlayerFromTeam(this.game.gameId, this.currentUser.id, this.game.gameTeams.find(x => x.players.map(y => y.id).includes(this.currentUser.id)).teamId).subscribe(next => console.log(next));
  }

  startGame(): void {
    this.restService.startGame(this.game.gameId).subscribe(next => {
      if (next.success){
        this.router.navigateByUrl('/gameplay/' + this.game.gameId);
      }
      else{
        console.error(next.description);
      }
    });
  }
}
