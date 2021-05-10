import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {GameAction} from '../../redux/game/game.action';
import {GameSelector} from '../../redux/game/game.selector';
import {Cube, CubeSide, TaskFacet} from '../../api/dto/Cube';
import {RestServiceService} from '../../api/rest-service.service';
import {MessageService} from 'primeng/api';
import {SocketService} from '../../api/socket.service';

export interface Options {
  name: string;
  code: TaskFacet;
}

@Component({
  selector: 'app-cube-table-page',
  templateUrl: './cube-table-page.component.html',
  styleUrls: ['./cube-table-page.component.css']
})
export class CubeTablePageComponent implements OnInit, OnDestroy {
  cubes: Cube[];
  editCube: Cube;
  currentSideCalibrated;
  options: Options[];
  selectedOption: Options;
  constructor(
    private store: Store,
    private gameActions: GameAction,
    private gameSelector: GameSelector,
    private restService: RestServiceService,
    private messageService: MessageService,
    private socketService: SocketService
    ) {
    this.options = [
      {name: TaskFacet[TaskFacet.PANTOMIME], code: TaskFacet.PANTOMIME},
      {name: TaskFacet[TaskFacet.REIM], code: TaskFacet.REIM},
      {name: TaskFacet[TaskFacet.SPRECHEN], code: TaskFacet.SPRECHEN},
      {name: TaskFacet[TaskFacet.ZEICHNEN], code: TaskFacet.ZEICHNEN}
    ];
    this.store.dispatch(gameActions.getCubes());
    this.store.select(gameSelector.selectAllCubes).subscribe(next => {
      this.cubes = next;
      if (this.editCube){
        this.editCube = next.find(x => x.cubeId === this.editCube.cubeId);
        this.currentSideCalibrated = this.editCube.sides.some(x => x.facetId === this.editCube.currentFacet);
      }
      }
    );
  }

  ngOnDestroy(): void {
       this.socketService.unsubscribeCubes();
    }

  ngOnInit(): void {
    this.socketService.subscribeCubes();
  }


  edit(cube: Cube): void {
    this.editCube = cube;

  }

  updateCube(editCube: Cube): void {
    const side: CubeSide = {
      cubeId: editCube.cubeId,
      facetId: editCube.currentFacet,
      task: this.selectedOption.code
    };

    this.restService.updateCubeSite(side).subscribe(next => {
      if (next && next.success){
        this.messageService.add({severity: 'Success', summary: 'Update', detail: 'Würfel erfolgreich geupdatet'});
      }
      else {
        this.messageService.add({severity: 'error', summary: 'Update', detail: 'Update des Würfels nicht erfolgreich.' + next.description});
      }
      }
      ,
      error => {
        this.messageService.add({severity: 'error', summary: 'Update', detail: 'Update des Würfels nicht erfolgreich.'});
      }
      );
  }
}
