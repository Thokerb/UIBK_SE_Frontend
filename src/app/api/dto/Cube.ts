export interface Cube {
  cubeId: string;
  batteryLevel: number;
  currentFacet: number;
  inGame: boolean;
  isCalibrated: boolean;
  observers: any[];
  task: string;
}
