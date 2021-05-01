import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamePageComponent } from './game-page/game-page.component';
import {BrowserModule} from '@angular/platform-browser';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';



@NgModule({
  declarations: [GamePageComponent],
  imports: [
    CommonModule,
    BrowserModule,
    CardModule,
    ButtonModule
  ]
})
export class GameSectionModule { }
