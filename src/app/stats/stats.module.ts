import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsPageComponent } from './stats-page/stats-page.component';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [StatsPageComponent],
    imports: [
        CommonModule,
        ButtonModule,
        RippleModule,
        FormsModule
    ]
})
export class StatsModule { }
