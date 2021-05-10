import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GameTopicDTO} from '../../api/dto/GameTopic';
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

  topics: GameTopicDTO[];
  editTopic: GameTopicDTO;
  words: Option[];
  wordSelected: Option;
  wordToAdd: string;

  constructor(private restService: RestServiceService, private messageService: MessageService,
              private gameTopicSelector: GametopicSelector, private store: Store, private changeDetector: ChangeDetectorRef) {
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
      if(this.editTopic !== null && this.editTopic !== undefined){
        const newTopic = this.topics.find(x => x.topicId === this.editTopic.topicId);
        this.editTopic = newTopic;
        this.words = [];
        for (const w in newTopic.words){
          this.words.push({name: newTopic.words[w].word, code: newTopic.words[w].word});
        }
        this.changeDetector.detectChanges();
      }

    }, error => {
      this.messageService.add({severity: 'error', summary: 'Themengebiete', detail: 'Verbindung mit dem Server nicht möglich!'});
    });
  }

  edit(topic: GameTopicDTO): void {
    this.editTopic = topic;
    this.words = [];
    for (const w in topic.words){
      this.words.push({name: topic.words[w].word, code: topic.words[w].word});
    }

  }

  delete(topic: GameTopicDTO): void {
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

  deleteWord(wordSelected: Option, editTopic: GameTopicDTO): void {
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

  addWord(word: string, editTopic: GameTopicDTO): void{
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

  download(topic: GameTopicDTO): void {
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
