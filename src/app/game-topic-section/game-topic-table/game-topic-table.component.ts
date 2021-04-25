import { Component, OnInit } from '@angular/core';
import {GameTopic} from '../../api/dto/GameTopic';
import {RestServiceService} from '../../api/rest-service.service';
import {MessageService} from 'primeng/api';
import {GametopicSelector} from '../../redux/gameTopic/gametopic.selector';
import {Store} from '@ngrx/store';

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

  constructor(private restService: RestServiceService, private messageService: MessageService,
              private gameTopicSelector: GametopicSelector, private store: Store) {
    this.getTopics();
  }

  ngOnInit(): void {
    this.store.select(this.gameTopicSelector.selectAllTopics).subscribe(next => this.getTopics());

  }

  private getTopics(): void {
    this.restService.getAllGameTopics().subscribe(next => {
      this.topics = [];
      for (const key in next.object){
        this.topics.push(next.object[key]);
      }
    }, error => {
      this.messageService.add({severity: 'error', summary: 'Themengebiete', detail: 'Verbindung mit dem Server nicht möglich!'});
    });
  }

  edit(topic: GameTopic): void {
    this.editTopic = topic;
    this.words = [];
    for (const w in topic.words){
      this.words.push({name: topic.words[w], code: topic.words[w]});
    }
    // this.words = topic.words.map(x => ({name: x, code: x}));


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

  download(topic: GameTopic): void {
    const sJson = JSON.stringify(topic);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=UTF-8,' + encodeURIComponent(sJson));
    element.setAttribute('download', `GameTopic_${topic.topic}.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
    document.body.removeChild(element);
  }
}
