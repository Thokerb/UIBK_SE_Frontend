import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameLobbyPageComponent } from './game-lobby-page/game-lobby-page.component';
import { GameLobbyTableComponent } from './game-lobby-table/game-lobby-table.component';
import {TableModule} from 'primeng/table';



@NgModule({
  declarations: [GameLobbyPageComponent, GameLobbyTableComponent],
    imports: [
        CommonModule,
        TableModule
    ]
})
export class GameLobbySectionModule { }
