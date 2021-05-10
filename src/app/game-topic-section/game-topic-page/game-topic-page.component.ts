import { Component, OnInit } from '@angular/core';
import {RestServiceService} from '../../api/rest-service.service';
import {MessageService} from 'primeng/api';
import {Store} from '@ngrx/store';
import {GametopicSelector} from '../../redux/gameTopic/gametopic.selector';
import {GameTopicAction} from '../../redux/gameTopic/gametopic.action';
import {GameTopicDTO} from '../../api/dto/GameTopic';
import {Word} from '../../api/dto/Game';

@Component({
  selector: 'app-game-topic-page',
  templateUrl: './game-topic-page.component.html',
  styleUrls: ['./game-topic-page.component.css']
})
export class GameTopicPageComponent implements OnInit {

  topic: GameTopicDTO;
  words: string[];
  add: boolean;
  constructor(private restService: RestServiceService,
              private messageService: MessageService,
              private store: Store, private gameTopicAction: GameTopicAction ) {
    this.words = [];
    this.topic = {
      topic: null,
      words: [],
      topicId: 0,
      description: null

    };
  }

  ngOnInit(): void {

  }

  addTopic(): void {
    this.topic.words = this.words.map(x => {
      const y: Word = {
        word: x,
        wordId: 0
      };
      return y;
    });
    console.log(this.topic);
    this.restService.addTopic(this.topic).subscribe(next => {
        this.store.dispatch(this.gameTopicAction.addTopic({item: this.topic}));
        this.messageService.add({severity: 'success', summary: 'Themengebiete', detail: `Themengebiet ${this.topic.topic} erfolgreich hinzugefügt`});
        this.topic = {
          topic: null,
          words: [],
          topicId: 0,
          description: null

        };
        this.add = false;
    },
      error => {
        this.messageService.add({severity: 'error', summary: 'Themengebiete', detail: 'Verbindung mit dem Server nicht möglich!'});

      }
      );
  }
}
