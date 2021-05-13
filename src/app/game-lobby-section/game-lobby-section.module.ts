import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameLobbyPageComponent } from './game-lobby-page/game-lobby-page.component';
import { GameLobbyTableComponent } from './game-lobby-table/game-lobby-table.component';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';



@NgModule({
  declarations: [GameLobbyPageComponent, GameLobbyTableComponent],
  imports: [
    CommonModule,
    TableModule,
    ToastModule,
    ButtonModule
  ]
})
export class GameLobbySectionModule { }
