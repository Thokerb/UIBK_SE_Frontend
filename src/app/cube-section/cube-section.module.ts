import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CubeTablePageComponent } from './cube-table-page/cube-table-page.component';
import { CubePageComponent } from './cube-page/cube-page.component';



@NgModule({
  declarations: [CubeTablePageComponent, CubePageComponent],
  imports: [
    CommonModule
  ]
})
export class CubeSectionModule { }
