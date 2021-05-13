import {Component, NgZone, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {TodoSelector} from '../../redux/todo/todo.selector';
import {TodoReducer} from '../../redux/todo/todo.reducer';
import {TodoAction} from '../../redux/todo/todo.action';
import {RestServiceService} from '../../api/rest-service.service';
import {SocketService} from '../../api/socket.service';
import {Router} from '@angular/router';
import {AuthenticationAction} from '../../redux/authentication/authentication.action';
import {GameAction} from '../../redux/game/game.action';
import {Game} from '../../api/dto/Game';
import * as config from '../../../config/appConfig.json';
import {SliderModule} from 'primeng/slider';
import {Cube} from '../../api/dto/Cube';
import {DropdownModule} from 'primeng/dropdown';
import {AuthenticationSelector} from "../../redux/authentication/authentication.selector";

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
  gameTopics: string[];
  availableCubes: Array<Partial<Cube>>;
  displayCubes: DisplayCube[];
  selectedCubeId: string;
  constructor(private store: Store,
              private todoSelector: TodoSelector,
              private todoActions: TodoAction,
              private restService: RestServiceService,
              private webSocket: SocketService,
              private router: Router,
              private gameAction: GameAction,
              private authSelector: AuthenticationSelector,
              private zone: NgZone,
              ) {
    this.numTeams = this.MIN_NUM_TEAMS;
    this.maxPoints = this.DEFAULT_MAX_POINTS;
    this.gameTopics = [];
    this.availableCubes = [];
    // this.displayCubes = [{name: 'c', code: '1'}, {name: 'c2', code: '2'}]; // Test
    this.displayCubes = [];
  }

  ngOnInit(): void {
    this.refreshAvailableCubes();
  }

  cubeChange(ev): void {
    console.log('cube change');
    console.log(ev);
    this.selectedCubeId = ev.value;
  }

  setAvailableCubes(cubes: Array<Partial<Cube>>): void {
    this.availableCubes = cubes;
    this.displayCubes = this.availableCubes.map(cube => ({name: 'Würfel ' + cube.cubeId, code: cube.cubeId}));
  }

  refreshAvailableCubes(): void {
    this.restService.getAllCubes().subscribe(cubes => {
      // this.setAvailableCubes(cubes);
      this.setAvailableCubes([{cubeId: '1'}, {cubeId: '2'}]); // Test
      console.log('New available cubes:');
      console.log(cubes);
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
    console.log(this.maxPoints);
    const game: Game | any = {
      gameId: '1', // doesn't matter
      gameName: this.gameName,
      gameMaxPoints: this.maxPoints,
      gameTopics: this.gameTopics,
      gameNumberTeams: this.numTeams,
      gamePlayers: [],
      gameTeams: []
    };
    // 1. Create game
    console.log('creating game: ');
    console.log(game);
    this.restService.createGame(game).subscribe(createGameResult => {
      console.log(createGameResult);
      const newGame = createGameResult.object;

      // TODO 2. Topic?

      // 3. Cube
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
