import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {GameAction} from '../../redux/game/game.action';
import {GameSelector} from '../../redux/game/game.selector';
import {Cube, TaskFacet} from '../../api/dto/Cube';

export interface Options {
  name: string;
  code: TaskFacet;
}

@Component({
  selector: 'app-cube-table-page',
  templateUrl: './cube-table-page.component.html',
  styleUrls: ['./cube-table-page.component.css']
})
export class CubeTablePageComponent implements OnInit {
  cubes: Cube[];
  editCube: Cube;
  currentSideCalibrated;
  options: Options[];
  selectedOption: Options;
  constructor(private store: Store, private gameActions: GameAction, private gameSelector: GameSelector) {
    this.options = [
      {name: TaskFacet[TaskFacet.PANTOMIME], code: TaskFacet.PANTOMIME},
      {name: TaskFacet[TaskFacet.REIM], code: TaskFacet.REIM},
      {name: TaskFacet[TaskFacet.SPRECHEN], code: TaskFacet.SPRECHEN},
      {name: TaskFacet[TaskFacet.ZEICHNEN], code: TaskFacet.ZEICHNEN}
    ];
    this.store.dispatch(gameActions.getCubes());
    this.store.select(gameSelector.selectAllCubes).subscribe(next => {
      this.cubes = next;
      this.editCube = next[0];
      if (this.editCube){
        this.editCube = next.find(x => x.cubeId === this.editCube.cubeId);
        this.currentSideCalibrated = this.editCube.sides.some(x => x.facetId === this.editCube.currentFacet);
      }
      }
    );
  }

  ngOnInit(): void {
  }


  edit(cube: Cube): void {
    this.editCube = cube;

  }
}
