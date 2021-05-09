import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamePageComponent } from './game-page/game-page.component';
import {BrowserModule} from '@angular/platform-browser';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import { GamePlayPageComponent } from './game-play-page/game-play-page.component';
import {DividerModule} from 'primeng/divider';



@NgModule({
  declarations: [GamePageComponent, GamePlayPageComponent],
    imports: [
        CommonModule,
        BrowserModule,
        CardModule,
        ButtonModule,
        DividerModule
    ]
})
export class GameSectionModule { }
