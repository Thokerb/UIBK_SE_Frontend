import { Injectable } from '@angular/core';
import * as config from '../../config/appConfig.json';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GameDTO} from './dto/Game';
import {DeleteUserResponse, UpdateUserRequest, User} from './dto/UserManagement';

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

}
