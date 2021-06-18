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
    topics: StatsTopic[];
    userTimesPlayed: any[];
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
  bestTopicsOptions: any;
  numDistinctTopics: number;
  topics: StatsTopic[] | null;
  userTimesPlayed: any[];
  constructor(private store: Store,
              private restService: RestServiceService,
              private webSocket: SocketService,
              private authSelector: AuthenticationSelector
  ) {
    this.mostPlayedTopicsData = null;
    this.bestTopicsData = null;
    this.numDistinctTopics = 0;
    this.topics = null;
    this.bestTopicsOptions = null;
  }

  ngOnInit(): void {
    this.store.select(this.authSelector.selectCurrentUser).subscribe(userResult => {
      const currentUserId = userResult.id;
      // console.log('Current user id: ' + currentUserId);
      this.restService.getStats(currentUserId).subscribe(statsResult => {
        this.stats = statsResult.object;
        console.log('get stats: ');
        console.log(this.stats);
        this.prepareChartData();
      });
      // this.prepareChartData();
    });
  }

  prepareChartData(): void {

    this.topics = this.stats.topics;
    this.topics = [];
    this.numDistinctTopics = this.stats.topics.length;

    if (this.stats?.userTimesPlayed != null) {
      this.userTimesPlayed = this.stats.userTimesPlayed;
      /*
      this.userTimesPlayed = [];
      for (const playerName in this.stats.userTimesPlayed) {
        const numGames = this.stats.userTimesPlayed[playerName];
        this.userTimesPlayed.push({
          playerName: playerName,
          numGames: numGames
        });
      }
       */
    }

    // Pie chart for most played topics
    this.mostPlayedTopicsData = {
      labels: this.stats.topics.map(topic => topic.topic),
      datasets: [
        {
          data: this.stats.topics.map(topic => topic.totalGuesses),
          backgroundColor: '#FF0000',
          label: 'Most Played Topics'
        }
      ]
    };

    const bestTopics = this.stats.topics
      .map(topic => ({topic: topic.topic, rating: topic.reachedPoints / topic.maxPoints}))
      .sort((t1, t2) => t1.rating - t2.rating);

    /*
    const bestTopics = [
      {
        topic: '1',
        rating: 0.5
      },
      {
        topic: '1',
        rating: 0.5
      },
      {
        topic: '1',
        rating: 0.5
      },
      {
        topic: '1',
        rating: 0.5
      },
      {
        topic: '1',
        rating: 0.5
      }
    ];

     */

    // Bar chart for best topics
    this.bestTopicsData = {
      labels: bestTopics.map(topic => topic.topic),
      datasets: [{
        barPercentage: 1.0,
        minBarLength: 2,
        data: bestTopics.map(topic => topic.rating),
        label: 'Topic Rating',
        backgroundColor: ['#FFE0E6', '#FFECD9', '#DBF2F2', '#D7ECFB', '#EBE0FF']
      }]
    };

    let maxRating = 0;
    for (const topic of bestTopics) {
      if (topic.rating > maxRating) { maxRating = topic.rating; }
    }

    this.bestTopicsOptions = {
      responsive: true,
      scales: {
        yAxes: [{
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            min: 0,
            max: 1.0
          }
        }]
      }
    };
  }

  sendToSocket(): void {
    this.webSocket.send();
  }
}
