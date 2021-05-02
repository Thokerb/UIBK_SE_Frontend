import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CubeTablePageComponent } from './cube-table-page/cube-table-page.component';
import { CubePageComponent } from './cube-page/cube-page.component';
import {TableModule} from 'primeng/table';



@NgModule({
  declarations: [CubeTablePageComponent, CubePageComponent],
  imports: [
    CommonModule,
    TableModule
  ]
})
export class CubeSectionModule { }
