﻿import { Component, OnInit } from '@angular/core';
import {Event} from '@angular/router';
import {GameTopic} from '../../api/dto/GameTopic';
import {RestServiceService} from '../../api/rest-service.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-game-topic-upload',
  templateUrl: './game-topic-upload.component.html',
  styleUrls: ['./game-topic-upload.component.css']
})
export class GameTopicUploadComponent implements OnInit {

  selectedFile: File;
  uploadTopic: GameTopic;
  constructor(private restService: RestServiceService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onFileUpload($event): void {
    console.log($event);
    const file = $event.target as HTMLInputElement;
    if (file.files.length === 0) {
      this.selectedFile = null;
      this.uploadTopic = null;
      return;
    }
    this.selectedFile = file.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, 'UTF-8');
    fileReader.onload = () => {
      this.uploadTopic = JSON.parse(fileReader.result as string);
      console.log(this.uploadTopic);
    };
    fileReader.onerror = (error) => {
      console.log(error);
    };
  }

  upload(uploadTopic: GameTopic): void {
    this.restService.uploadGameTopic(uploadTopic).subscribe(next => {
        this.messageService.add({severity: 'success', summary: next.topic, detail: `Themengebiet ${next.topic} wurde erfolgreich hinzugefügt.`});
    },
      error => {
        this.messageService.add({severity: 'error', summary: 'Fehler', detail: `Themengebiet ${uploadTopic.topic} konnte nicht hinzugefügt werden`});
        console.error(error);

      }
      );

  }
}
