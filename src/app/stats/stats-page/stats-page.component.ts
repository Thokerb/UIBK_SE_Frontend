import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {TodoSelector} from '../../redux/todo/todo.selector';
import {TodoReducer} from '../../redux/todo/todo.reducer';
import {TodoAction} from '../../redux/todo/todo.action';
import {RestServiceService} from '../../api/rest-service.service';
import {SocketService} from '../../api/socket.service';
import {Router} from '@angular/router';
import {ChartModule} from 'primeng/chart';
import {Stats} from '../../api/dto/Stats';

@Component({
  selector: 'app-stats',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.css']
})
export class StatsPageComponent implements OnInit {

  stats: Stats;
  mostPlayedTopicsData: any;
  constructor(private store: Store,
              private restService: RestServiceService,
              private webSocket: SocketService
              ) {
    this.mostPlayedTopicsData = null;
  }

  ngOnInit(): void {
    // TODO get
    this.prepareChartData();
  }

  prepareChartData(): void {
    // TODO
  }

  sendToSocket(): void {
    this.webSocket.send();
  }
}
