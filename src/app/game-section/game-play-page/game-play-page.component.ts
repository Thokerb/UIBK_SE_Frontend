import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {GameAction} from '../../redux/game/game.action';
import {GameSelector} from '../../redux/game/game.selector';
import {RestServiceService} from '../../api/rest-service.service';
import {AuthenticationSelector} from '../../redux/authentication/authentication.selector';
import {CompleteGameDTO, GameSection, SectionStatus, Teams} from '../../api/dto/Game';
import {User} from '../../redux/authentication/authentication.reducer';
import {SocketService} from '../../api/socket.service';

@Component({
  selector: 'app-game-play-page',
  templateUrl: './game-play-page.component.html',
  styleUrls: ['./game-play-page.component.css']
})
export class GamePlayPageComponent implements OnInit, OnDestroy {
  game: CompleteGameDTO;
  currentUser: User;
  gameSection: GameSection;
  isActivePlayer: boolean;
  isActiveTeam: boolean;
  myTeamId: number;
  SectionStatus = SectionStatus;
  gameTime: number;


  constructor(private store: Store,
              private gameActions: GameAction,
              private gameSelector: GameSelector,
              private restService: RestServiceService,
              private socketService: SocketService,
              private authSelector: AuthenticationSelector) { }
  ngOnInit(): void {
    this.socketService.subscribeSections();
    setInterval(() => {
      this.gameTime = this.gameTime - 1;
    }, 1000);
    this.store.select(this.authSelector.selectCurrentUser).subscribe(next => {
      this.currentUser = next;
      if (this.game){
        this.myTeamId = this.game.gameTeams.find(x => x.players.map(y => y.id).includes(this.currentUser.id)).teamId;
      }
    });
    this.store.select(this.gameSelector.selectCurrentGame).subscribe(next =>
      {
        this.game = next;
        if (this.currentUser){
          this.myTeamId = this.game.gameTeams.find(x => x.players.map(y => y.id).includes(this.currentUser.id)).teamId;
        }

    });
    this.store.select(this.gameSelector.selectCurrentSection).subscribe(next => {
      console.log(next);
      if(!next)return;
      this.gameSection = next;
      this.gameTime = next.maxTime;
      if (this.currentUser){
        this.isActivePlayer = this.gameSection.activePlayer.id === this.currentUser.id;
        this.isActiveTeam = this.gameSection.activeTeam.players.map(x => x.id).includes(this.currentUser.id);
      }
    });
  }

  ngOnDestroy(): void {
    this.socketService.unsubscribeSection();
  }

  wortErraten(): void {
    this.restService.guessedWord(this.game.gameId, this.gameSection.word.wordId).subscribe(next => console.log(next));
    // TODO: inform backend about gameSection End
  }

  strike(): void {
    // TODO: inform backend about strike
    this.restService.strikeGameSection(this.game.gameId).subscribe(next => console.log(next));
  }
}
