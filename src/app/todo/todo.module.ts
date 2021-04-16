import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ButtonModule} from "primeng/button";



@NgModule({
  declarations: [DashboardComponent],
    imports: [
        CommonModule,
        ButtonModule
    ]
})
export class TodoModule { }
