import { Component, OnInit } from '@angular/core';
import {GameTopic} from '../../api/dto/GameTopic';
import {RestServiceService} from '../../api/rest-service.service';
import {MessageService} from 'primeng/api';

export interface Option {
  name: string;
  code: string;
}

@Component({
  selector: 'app-game-topic-table',
  templateUrl: './game-topic-table.component.html',
  styleUrls: ['./game-topic-table.component.css']
})
export class GameTopicTableComponent implements OnInit {

  topics: GameTopic[];
  editTopic: GameTopic;
  words: Option[];
  wordSelected: Option;
  wordToAdd: string;

  constructor(private restService: RestServiceService, private messageService: MessageService) {
    this.getTopics();
  }

  ngOnInit(): void {
    const topic: GameTopic = {
      topic: 'WELTRAUM',
      topicId: 4,
      words: ['max', 'morta'],
      description: 'adwuihawuidh auiwdh uiawdh awuihd uiawhdui awhd '
    };
    this.edit(topic);
  }

  private getTopics(): void {
    this.restService.getAllGameTopics().subscribe(next => this.topics = next, error => {
      this.messageService.add({severity: 'error', summary: 'Themengebiete', detail: 'Verbindung mit dem Server nicht möglich!'});
    });
  }

  edit(topic: GameTopic): void {
    this.editTopic = topic;
    this.words = topic.words.map(x => ({name: x, code: x}));


  }

  delete(topic: GameTopic): void {
    this.restService.deleteTopic(topic.topicId).subscribe(next => {
        this.getTopics();
        this.messageService.add({severity: 'success', summary: 'Themengebiete', detail: `Themengebiet ${topic.topic} erfolgreich gelöscht.`});
      },
      error => {
        this.getTopics();
        this.messageService.add({severity: 'error', summary: 'Themengebiete', detail: `Themengebiet ${topic.topic} löschen nicht möglich`});
      }
    );
  }

  deleteWord(wordSelected: Option, editTopic: GameTopic): void {
    this.restService.deleteTopicWord(editTopic.topicId, wordSelected.name).subscribe(next => {
        this.getTopics();
        this.messageService.add({severity: 'success', summary: 'Themengebiete', detail: `Wort ${wordSelected.name} erfolgreich gelöscht.`});
      },
      error => {
        this.getTopics();
        this.messageService.add({severity: 'error', summary: 'Themengebiete', detail: `Wort ${wordSelected.name} konnte nicht gelöscht werden`});
      }
    );
  }

  addWord(word: string, editTopic: GameTopic): void{
    this.restService.addWord(editTopic.topicId, word).subscribe(next => {
        this.getTopics();
        this.messageService.add({severity: 'success', summary: 'Themengebiete', detail: `Wort ${word} erfolgreich hinzugefügt.`});
      },
      error => {
        this.getTopics();
        this.messageService.add({severity: 'error', summary: 'Themengebiete', detail: `Wort ${word} konnte nicht hinzugefügt werden`});
      }
    );
  }
}
