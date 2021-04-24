import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameTopicPageComponent } from './game-topic-page/game-topic-page.component';
import { GameTopicUploadComponent } from './game-topic-upload/game-topic-upload.component';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import { GameTopicTableComponent } from './game-topic-table/game-topic-table.component';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {ListboxModule} from 'primeng/listbox';
import {FormsModule} from '@angular/forms';
import {ChipsModule} from 'primeng/chips';
import {InputTextareaModule} from 'primeng/inputtextarea';



@NgModule({
  declarations: [GameTopicPageComponent, GameTopicUploadComponent, GameTopicTableComponent],
  imports: [
    CommonModule,
    ScrollPanelModule,
    ButtonModule,
    ToastModule,
    TableModule,
    DialogModule,
    InputTextModule,
    ListboxModule,
    FormsModule,
    ChipsModule,
    InputTextareaModule
  ]
})
export class GameTopicSectionModule { }
