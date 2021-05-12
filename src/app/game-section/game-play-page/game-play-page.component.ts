import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {GameAction} from '../../redux/game/game.action';
import {GameSelector} from '../../redux/game/game.selector';
import {RestServiceService} from '../../api/rest-service.service';
import {AuthenticationSelector} from '../../redux/authentication/authentication.selector';
import {CompleteGameDTO, GameSection, SectionStatus, Teams} from '../../api/dto/Game';
import {User} from '../../redux/authentication/authentication.reducer';
import {SocketService} from '../../api/socket.service';
import {ActivatedRoute} from '@angular/router';

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
  private id: number;
  timer;


  constructor(private store: Store,
              private gameActions: GameAction,
              private gameSelector: GameSelector,
              private restService: RestServiceService,
              private socketService: SocketService,
              private route: ActivatedRoute,
              private authSelector: AuthenticationSelector) { }
  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.store.dispatch(this.gameActions.init({gameId: this.id}));
    this.socketService.subscribeSections();
    this.store.select(this.authSelector.selectCurrentUser).subscribe(next => {
      this.currentUser = next;
      if (this.game){
        this.myTeamId = this.game.gameTeams.find(x => x.players.map(y => y.id).includes(this.currentUser.id)).teamId;
      }
    });
    this.store.select(this.gameSelector.selectCurrentGame).subscribe(next =>
      {
        this.game = next;
        if (this.currentUser && this.game){
          this.myTeamId = this.game.gameTeams.find(x => x.players.map(y => y.id).includes(this.currentUser.id)).teamId;
        }

    });
    this.store.select(this.gameSelector.selectCurrentSection).subscribe(next => {
      console.log(next);
      if(!next)return;
      this.gameSection = next;
      this.gameTime = next.maxTime;
      if(!this.gameSection.finished && this.gameSection.activeSection){
        this.startTimer();
      }

      if (this.currentUser){
        this.isActivePlayer = this.gameSection.activePlayer.id === this.currentUser.id;
        this.isActiveTeam = this.gameSection.activeTeam.players.map(x => x.id).includes(this.currentUser.id);
      }
    });
  }

  startTimer(): void{
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if(this.gameTime <= 0){
        alert('timeout');
        clearInterval(this.timer);
        this.restService.sectionTimeout(this.game.gameId).subscribe(next => console.log(next));
      }else{
        this.gameTime = this.gameTime - 1;
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    this.socketService.unsubscribeSection();
  }

  wortErraten(): void {
    console.log(this.gameSection.word);
    clearInterval(this.timer);
    this.restService.guessedWord(this.game.gameId, this.gameSection.word.word).subscribe(next => console.log(next));
    // TODO: inform backend about gameSection End
  }

  strike(): void {
    // TODO: inform backend about strike
    this.restService.strikeGameSection(this.game.gameId).subscribe(next => console.log(next));
  }
}
