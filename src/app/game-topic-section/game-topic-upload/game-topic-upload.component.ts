import { Component, OnInit } from '@angular/core';
import {GameTopicDTO} from '../../api/dto/GameTopic';
import {RestServiceService} from '../../api/rest-service.service';
import {MessageService} from 'primeng/api';
import {Store} from '@ngrx/store';
import {GameTopicAction} from '../../redux/gameTopic/gametopic.action';

@Component({
  selector: 'app-game-topic-upload',
  templateUrl: './game-topic-upload.component.html',
  styleUrls: ['./game-topic-upload.component.css']
})
export class GameTopicUploadComponent implements OnInit {

  selectedFile: File;
  uploadTopic: GameTopicDTO;
  constructor(private restService: RestServiceService, private messageService: MessageService, private store: Store, private gameTopicAction: GameTopicAction) { }

  ngOnInit(): void {
  }

  onFileUpload($event): void {
    console.log($event);
    const f = $event.files[0] as File;
    if (!f) {
      this.selectedFile = null;
      this.uploadTopic = null;
      return;
    }
    this.selectedFile = f;
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, 'UTF-8');
    fileReader.onload = () => {
      this.uploadTopic = JSON.parse(fileReader.result as string);
      console.log(this.uploadTopic);
      this.upload(this.uploadTopic);
    };
    fileReader.onerror = (error) => {
      console.log(error);
    };
  }

  upload(uploadTopic: GameTopicDTO): void {
    this.restService.uploadGameTopic(uploadTopic).subscribe(next => {
        this.messageService.add({severity: 'success', summary: next.object.topic, detail: `Themengebiet ${next.object.topic} wurde erfolgreich hinzugefügt.`});
        this.store.dispatch(this.gameTopicAction.addTopic({item: uploadTopic}));
        },
      error => {
        this.messageService.add({severity: 'error', summary: 'Fehler', detail: `Themengebiet ${uploadTopic.topic} konnte nicht hinzugefügt werden`});
        console.error(error);

      }
      );

  }
}
