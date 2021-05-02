import { Injectable } from '@angular/core';
import * as config from '../../config/appConfig.json';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CompleteGameDTO, Game, GameDTO, GameLobbyElement, JoinGameResponse} from './dto/Game';
import {DeleteUserResponse, UpdateUserRequest, User} from './dto/UserManagement';
import {GameTopic, GameTopicDTO, GameTopicResponse, UploadGameTopicResponse} from './dto/GameTopic';
import {Cube} from './dto/Cube';

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

  uploadGameTopic(uploadTopic: GameTopic): Observable<UploadGameTopicResponse> {
    return this.http.post<UploadGameTopicResponse>(config.baseURI + config.GameTopic, uploadTopic);
  }

  getAllGameTopics(): Observable<GameTopicResponse> {
    return this.http.get<GameTopicResponse>(config.baseURI + config.GameTopic);
  }

  deleteTopic(topicId: number): Observable<any> {
    return this.http.delete(config.baseURI + config.GameTopic + '/' + topicId);
  }

  deleteTopicWord(topicId: number, word: string): Observable<any> {
    return this.http.patch(config.baseURI + config.deleteWord + '/' + topicId, word);
  }

  addWord(topicId: number, word: string): Observable<any> {
    return this.http.patch(config.baseURI + config.addWord + '/' + topicId, word);
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

  getAllGamesForLobby(): Observable<GameLobbyElement[]> {
    return this.http.get<GameLobbyElement[]>(config.baseURI + config.Game);
  }

  getAllCubes(): Observable<Cube[]> {
    return this.http.get<Cube[]>(config.baseURI + config.Cube);
  }

  // TODO: JoinGameResponse
  joinGame(playerName: string, gameId: number): Observable<boolean> {
    return this.http.patch<boolean>( `${config.baseURI + config.joinGame}/${gameId}/${playerName}`, null);
  }

  getGame(id: number): Observable<CompleteGameDTO> {
    return this.http.get<CompleteGameDTO>(config.baseURI + config.Game + '/' + id);
  }
}
