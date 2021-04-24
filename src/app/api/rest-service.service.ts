import { Injectable } from '@angular/core';
import * as config from '../../config/appConfig.json';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GameDTO} from './dto/Game';
import {DeleteUserResponse, UpdateUserRequest, User} from './dto/UserManagement';
import {GameTopic, GameTopicDTO} from './dto/GameTopic';

@Injectable({
  providedIn: 'root'
})
export class RestServiceService {

  constructor(private http: HttpClient) { }

  getConfig(): Observable<GameDTO> {
    return this.http.get<GameDTO>(config.baseURI + config.Game);
  }

  getTeam(): Observable<any> {
    return this.http.get<any>(config.baseURI + config.Team);
  }

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(config.baseURI + config.GetAllUser);
  }

  deleteUser(userId: string): Observable<DeleteUserResponse> {
    return this.http.delete(config.baseURI + config.DeleteUser + '/' + userId);
  }

  updateUser(request: UpdateUserRequest, userId: string): Observable<any> {
    return this.http.patch(config.baseURI + config.UpdateUser + '/' + userId, request);
  }

  uploadGameTopic(uploadTopic: GameTopic): Observable<GameTopic> {
    return this.http.post<GameTopic>(config.baseURI + config.GameTopic, uploadTopic);
  }

  getAllGameTopics(): Observable<Map<number, GameTopic>> {
    return this.http.get<Map<number, GameTopic>>(config.baseURI + config.GameTopic);
  }

  deleteTopic(topicId: number): Observable<any> {
    return this.http.delete(config.baseURI + config.GameTopic + '/' + topicId);
  }

  deleteTopicWord(topicId: number, word: string): Observable<any> {
    return this.http.patch(config.baseURI + config.deleteWord + '/' + topicId, {word: word});
  }

  addWord(topicId: number, word: string): Observable<any> {
    return this.http.patch(config.baseURI + config.addWord + '/' + topicId, {word: word});
  }

  addTopic(topic: GameTopic): Observable<GameTopic> {
    const topicDTO: GameTopicDTO = {
      topic: topic.topic,
      topicId: topic.topicId,
      words: Array.from(topic.words),
      description: topic.description
    };
    return this.http.post<GameTopic>(config.baseURI + config.GameTopic, topicDTO);

  }
}
