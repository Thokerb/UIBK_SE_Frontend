import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {RestServiceService} from '../../api/rest-service.service';
import {SocketService} from '../../api/socket.service';
import {Router} from '@angular/router';
import {ChartModule} from 'primeng/chart';
import {Stats} from '../../api/dto/Stats';
import {AuthenticationSelector} from '../../redux/authentication/authentication.selector';
import {TableModule} from 'primeng/table';

interface StatsResult {
  success: boolean;
  object: {
    userId: string;
    totalGuesses: number;
    totalTimeForAllGuesses: number;
    topics: StatsTopic[],
  };
  description: string;
}

interface StatsTopic {
  topicId: number;
  topic: string;
  maxPoints: number;
  reachedPoints: number;
  totalGuesses: number;
  timeForAllGuesses: number;
}


@Component({
  selector: 'app-stats',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.css']
})
export class StatsPageComponent implements OnInit {
  stats: Stats;
  mostPlayedTopicsData: any;
  bestTopicsData: any;
  numDistinctTopics: number;
  topics: StatsTopic[] | null;
  constructor(private store: Store,
              private restService: RestServiceService,
              private webSocket: SocketService,
              private authSelector: AuthenticationSelector
  ) {
    this.mostPlayedTopicsData = null;
    this.bestTopicsData = null;
    this.numDistinctTopics = 0;
    this.topics = null;
  }

  ngOnInit(): void {
    this.store.select(this.authSelector.selectCurrentUser).subscribe(userResult => {
      const currentUserId = userResult.id;
      console.log('Current user id: ' + currentUserId);
      this.restService.getStats(currentUserId).subscribe(statsResult => {
        // Test
        /*
        statsResult = {
          success: true,
          object: {
            userId: 'admin',
            totalGuesses: 3,
            totalTimeForAllGuesses: 1676,
            topics: [
              {
                topicId: 1,
                topic: 'SPORT',
                maxPoints: 9,
                reachedPoints: 9,
                totalGuesses: 3,
                timeForAllGuesses: 1676
              }
            ]
          },
          description: 'Player Stats'
        };
         */
        this.stats = statsResult.object;
        console.log('get stats: ');
        console.log(this.stats);
        this.prepareChartData();
      });
    });
  }

  prepareChartData(): void {

    this.numDistinctTopics = this.stats.topics.length;

    // Pie chart for most played topics
    this.mostPlayedTopicsData = {
      labels: this.stats.topics.map(topic => topic.topic),
      datasets: [
        {
          data: this.stats.topics.map(topic => topic.totalGuesses)
        }
      ]
    };

    const bestTopics = this.stats.topics
      .map(topic => ({topic: topic.topic, rating: topic.reachedPoints / topic.maxPoints}))
      .sort((t1, t2) => t1.rating - t2.rating);

    // Bar chart for best topics
    this.bestTopicsData = {
      labels: bestTopics.map(topic => topic.topic),
      datasets: [{
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
        data: bestTopics.map(topic => topic.rating)
      }]
    };

    // TODO more
  }

  sendToSocket(): void {
    this.webSocket.send();
  }
}
