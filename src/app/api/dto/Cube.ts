import {Game} from './Game';

export interface Cube {
  cubeId: string;
  batteryLevel: number;
  currentFacet: number;
  inGame: boolean;
  calibrated: boolean;
  observers: any[];
  task: string;
  sides: CubeSide[];
}

export interface CubeSide {
  cubeId: string;
  facetId: number;
  task: TaskFacet;
}


export enum TaskFacet {
  'PANTOMIME',
  'REIM',
  'SPRECHEN',
  'ZEICHNEN'
}

export interface UpdateCubeResponse{
  success: boolean;
  description: string;
  object: Cube;
}
