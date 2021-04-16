import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule
  ]
})
export class TodoModule { }
