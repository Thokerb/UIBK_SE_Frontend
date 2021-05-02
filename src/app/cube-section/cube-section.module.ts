import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CubeTablePageComponent } from './cube-table-page/cube-table-page.component';
import { CubePageComponent } from './cube-page/cube-page.component';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from 'primeng/divider';
import {ProgressBarModule} from 'primeng/progressbar';
import {ButtonModule} from 'primeng/button';



@NgModule({
  declarations: [CubeTablePageComponent, CubePageComponent],
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    DividerModule,
    ProgressBarModule,
    ButtonModule
  ]
})
export class CubeSectionModule { }
