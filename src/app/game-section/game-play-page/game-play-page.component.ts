import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {GameAction} from '../../redux/game/game.action';
import {GameSelector} from '../../redux/game/game.selector';
import {RestServiceService} from '../../api/rest-service.service';
import {AuthenticationSelector} from '../../redux/authentication/authentication.selector';
import {CompleteGameDTO, GameSection, SectionStatus, Teams} from '../../api/dto/Game';
import {User} from '../../redux/authentication/authentication.reducer';
import {SocketService} from '../../api/socket.service';
import {ActivatedRoute} from '@angular/router';

interface COLOR_CODE {
  color: string;
  threshold: number;
}

@Component({
  selector: 'app-game-play-page',
  templateUrl: './game-play-page.component.html',
  styleUrls: ['./game-play-page.component.css']
})
export class GamePlayPageComponent implements OnInit, OnDestroy, AfterViewInit {


  constructor(private store: Store,
              private gameActions: GameAction,
              private gameSelector: GameSelector,
              private restService: RestServiceService,
              private socketService: SocketService,
              private route: ActivatedRoute,
              private authSelector: AuthenticationSelector) { }
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

  @ViewChild('basetimerlabel') basetimerlabel: ElementRef;

  FULL_DASH_ARRAY = 283;


  circleDasharray: string;
  TIME_LIMIT: number;
  timerInterval = null;
  remainingPathColor = 'green';
  info: COLOR_CODE = {
    color: 'green',
    threshold: 0
  };
  warning: COLOR_CODE = {
    color: 'orange',
    threshold: 20
  };
  error: COLOR_CODE = {
    color: 'red',
    threshold: 10
  };

  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.store.dispatch(this.gameActions.init({gameId: this.id}));
    this.socketService.subscribeSections();
    this.socketService.subscribeGame();
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
      if (!next) {return; }
      this.gameSection = next;
      // this.circleDasharray = '283';
      if (!this.gameSection.finished && this.gameSection.activeSection){
        this.gameTime = next.maxTime;
        this.startTimer2();
      }

      if (!this.gameSection.activeSection){
        clearInterval(this.timerInterval);
        this.gameTime = Math.round(next.reachedTime / 100) / 10;
      }
      if (this.gameSection.finished){
        clearInterval(this.timerInterval);
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
      if (this.gameTime <= 0){
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
    this.socketService.unsubscribeGame();
  }

  wortErraten(): void {
    clearInterval(this.timerInterval);
    this.restService.guessedWord(this.game.gameId, this.gameSection.word.word).subscribe(next => console.log(next));
    // TODO: inform backend about gameSection End
  }

  strike(): void {
    // TODO: inform backend about strike
    this.restService.strikeGameSection(this.game.gameId).subscribe(next => console.log(next));
  }

  startTimer2(): void {
    clearInterval(this.timerInterval);
    this.TIME_LIMIT = this.gameTime;

    this.timerInterval = setInterval(() => {
      if (this.gameTime <= 10) {this.gameTime = 30; }
      if (this.gameTime <= 0){
        alert('timeout');
        clearInterval(this.timerInterval);
        this.restService.sectionTimeout(this.game.gameId).subscribe(next => console.log(next));
      }else{
        this.gameTime = this.gameTime - 1;
      }
      this.setCircleDasharray();
      this.setRemainingPathColor(this.gameTime);
    }, 1000);
  }

  setRemainingPathColor(timeLeft): void {
    if (timeLeft <= this.error.threshold) {
      this.remainingPathColor = 'red';
    } else if (timeLeft <= this.warning.threshold) {
      this.remainingPathColor = 'orange';
    }
  }

  calculateTimeFraction() {
    const rawTimeFraction = this.gameTime / this.TIME_LIMIT;
    return rawTimeFraction - (1 / this.TIME_LIMIT) * (1 - rawTimeFraction);
  }

  setCircleDasharray(): void {
    const circleDasharray = `${(
      this.calculateTimeFraction() * this.FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    this.circleDasharray = circleDasharray;
  }
}
