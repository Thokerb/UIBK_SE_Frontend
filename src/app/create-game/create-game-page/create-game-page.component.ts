import {Component, NgZone, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {TodoSelector} from '../../redux/todo/todo.selector';
import {TodoAction} from '../../redux/todo/todo.action';
import {RestServiceService} from '../../api/rest-service.service';
import {SocketService} from '../../api/socket.service';
import {Router} from '@angular/router';
import {GameAction} from '../../redux/game/game.action';
import {Game} from '../../api/dto/Game';
import * as config from '../../../config/appConfig.json';
import {Cube} from '../../api/dto/Cube';
import {AuthenticationSelector} from '../../redux/authentication/authentication.selector';
import {GametopicSelector} from '../../redux/gameTopic/gametopic.selector';
import {GameTopicDTO} from '../../api/dto/GameTopic';
import {InputNumberModule} from 'primeng/inputnumber';

interface DisplayCube {
  name: string;
  code: string;
}

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game-page.component.html',
  styleUrls: ['./create-game-page.component.css']
})
export class CreateGamePageComponent implements OnInit {

  readonly MIN_NUM_TEAMS = config.minNumTeams;
  readonly MAX_NUM_TEAMS = config.maxNumTeams;
  readonly DEFAULT_MAX_POINTS = config.defaultMaxPoints;

  gameName: string;
  maxPoints: number;
  numTeams: number;
  availableCubes: Array<Partial<Cube>>;
  displayCubes: DisplayCube[];
  selectedCubeId: string;
  availableTopics: GameTopicDTO[];
  selectedTopics: string[];
  constructor(private store: Store,
              private todoSelector: TodoSelector,
              private todoActions: TodoAction,
              private restService: RestServiceService,
              private webSocket: SocketService,
              private router: Router,
              private gameAction: GameAction,
              private authSelector: AuthenticationSelector,
              private gameTopicSelector: GametopicSelector,
              private zone: NgZone,
  ) {
    this.numTeams = this.MIN_NUM_TEAMS;
    this.maxPoints = this.DEFAULT_MAX_POINTS;
    this.selectedTopics = [];
    this.availableCubes = [];
    // this.displayCubes = [{name: 'c', code: '1'}, {name: 'c2', code: '2'}]; // Test
    this.displayCubes = [];
  }

  ngOnInit(): void {
    this.refreshAvailableCubes();
    this.loadTopics();
    /*
    this.store.select(this.gameTopicSelector.selectAllTopics).subscribe(topics => {
      console.log('Select topics');
      console.log(topics);
      // this.availableTopics = topics;
      this.availableTopics = [
        {topic: 'test1', topicId: 1, description: 'Test topic', words: []},
        {topic: 'test2', topicId: 2, description: 'Test topic', words: []},
        {topic: 'test3', topicId: 3, description: 'Test topic', words: []}
      ]; // Test
    });
     */
  }

  cubeChange(ev): void {
    console.log('cube change');
    console.log(ev);
    this.selectedCubeId = ev.value;
  }

  topicChange(ev): void {
    console.log('topic change');
    console.log(ev);
    this.selectedTopics = ev.value.map(topicId => `${topicId}`);
  }

  onMaxPointsChange(ev): void {
    // console.log('onMaxPointsChange');
    // console.log(ev);
    this.maxPoints = ev.value;
  }

  onNumTeamsChange(ev): void {
    // console.log('onMaxPointsChange');
    // console.log(ev);
    this.numTeams = ev.value;
  }

  setAvailableCubes(cubes: Array<Partial<Cube>>): void {
    this.availableCubes = cubes;
    // TODO interface for displayCubes
    this.displayCubes = this.availableCubes.map(cube => ({name: 'Würfel ' + cube.cubeId, code: cube.cubeId, inactive: !cube.calibrated}));
  }

  refreshAvailableCubes(): void {
    this.restService.getAllCubes().subscribe(cubes => {
      this.setAvailableCubes(cubes);
      // this.setAvailableCubes([{cubeId: '1', calibrated: true}, {cubeId: '2', calibrated: false}]); // Test
      console.log('New available cubes:');
      console.log(cubes);
    });
  }

  loadTopics(): void {
    this.restService.getAllGameTopics().subscribe(topicsResult => {
      const topics = [];
      console.log('topicsResult');
      console.log(topicsResult);
      for (const key of Object.keys(topicsResult.object)){
        topics.push(topicsResult.object[key]);
      }
      console.log('loaded topics');
      console.log(topics);
      this.availableTopics = topics;
    });
  }

  onCreateBtn(ev: MouseEvent): void {
    ev.preventDefault();
    this.createGame();
  }

  /**
   * TODO error handling
   */
  createGame(): void {
    const game: Game | any = {
      gameId: '1', // doesn't matter
      gameName: this.gameName,
      gameMaxPoints: this.maxPoints,
      gameTopics: [],
      gameNumberTeams: this.numTeams,
      gamePlayers: [],
      gameTeams: []
    };
    console.log(game);
    // 1. Create game
    console.log('creating game: ');
    console.log(game);
    this.restService.createGame(game).subscribe(createGameResult => {
      console.log(createGameResult);
      const newGame = createGameResult.object;

      // 2. Add topics to game
      console.log('Selected topics:');
      console.log(this.selectedTopics);
      this.selectedTopics.forEach((topicId: string) => {
        // TODO wait for multiple
        this.restService.addTopicToGame(newGame.gameId, topicId).subscribe(topicResult => console.log(topicResult));
      });

      // 3. Add cube to game
      console.log('selected cube id: ' + this.selectedCubeId);
      this.restService.addCubeToGame(newGame.gameId, this.selectedCubeId).subscribe(cubeResult => {
        console.log(cubeResult);

        // 4. Join current player
        this.store.select(this.authSelector.selectCurrentUser).subscribe(authResult => {
          const currentUser = authResult;
          this.restService.joinGame(currentUser.username, newGame.gameId).subscribe(playerJoinResult => {
            console.log(playerJoinResult);

            this.zone.run(() => {
              this.router.navigateByUrl('/game/' + newGame.gameId);
            });
          });
        });
      });
    });
  }

  onCancelBtn(ev: MouseEvent): void {
    ev.preventDefault();
    this.router.navigateByUrl('/dashboard');
  }

  sendToSocket(): void {
    this.webSocket.send();
  }
}
