import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CubeTablePageComponent } from './cube-table-page/cube-table-page.component';
import { CubePageComponent } from './cube-page/cube-page.component';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from 'primeng/divider';
import {ProgressBarModule} from 'primeng/progressbar';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';



@NgModule({
  declarations: [CubeTablePageComponent, CubePageComponent],
    imports: [
        CommonModule,
        TableModule,
        DialogModule,
        DividerModule,
        ProgressBarModule,
        ButtonModule,
        DropdownModule,
        FormsModule,
        ToastModule
    ]
})
export class CubeSectionModule { }
