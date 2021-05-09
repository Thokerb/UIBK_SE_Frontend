import { Injectable } from '@angular/core';
import * as config from '../../config/appConfig.json';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CompleteGameDTO, Game, GameDTO, GameLobbyElement, GameLobbyResponse, GetGameResponse, JoinGameResponse} from './dto/Game';
import {DeleteUserResponse, UpdateUserRequest, User} from './dto/UserManagement';
import {GameTopic, GameTopicDTO, GameTopicResponse, UploadGameTopicResponse} from './dto/GameTopic';

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

  getAllGamesForLobby(): Observable<GameLobbyResponse> {
    return this.http.get<GameLobbyResponse>(config.baseURI + config.Game);
  }

  // TODO: JoinGameResponse
  joinGame(playerName: string, gameId: number): Observable<boolean> {
    return this.http.patch<boolean>( `${config.baseURI + config.joinGame}/${gameId}/${playerName}`, null);
  }

  getGame(id: number): Observable<GetGameResponse> {
    return this.http.get<GetGameResponse>(config.baseURI + config.Game + '/' + id);
  }

  joinTeam(gameId: number, teamId: number, id: string): Observable<GenericResponse> {
    const object = {
      gameId: gameId,
      username: id,
      teamId: teamId
    };
    return this.http.patch<GenericResponse>(config.baseURI + config.JoinTeam, object);
  }

  removePlayerFromTeam(gameId: number, id: string): Observable<GenericResponse> {
    const object = {
      gameId: gameId,
      username: id,
      teamId: 0
    };
    return this.http.patch<GenericResponse>(config.baseURI + config.RemovePlayerTeam, object);
  }

  // TODO: adjust
  startGame(gameId: number): Observable<GenericResponse>{
    return this.http.post<GenericResponse>(config.baseURI + config.startGame, gameId);
  }

  // TODO: adjust
  startSection(gameId: number): Observable<GenericResponse>{
    return this.http.post<GenericResponse>(config.baseURI + config.startSection, gameId);
  }

  // TODO: adjust
  stopSection(gameId: number): Observable<GenericResponse>{
    return this.http.post<GenericResponse>(config.baseURI + config.stopSection, gameId);
  }

  guessedWord(gameId: number): Observable<GenericResponse>{
    return this.http.post<GenericResponse>(config.baseURI + config.guessedWord, gameId);
  }

  strikeGameSection(gameId: number): Observable<GenericResponse>{
    return this.http.post<GenericResponse>(config.baseURI + config.strikeGameSection, gameId);
  }
}

export interface GenericResponse {
  success: boolean;
  description: string;
  object: any;
}
