import { Injectable } from '@angular/core';
import * as config from '../../config/appConfig.json';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GameDTO} from './dto/Game';
import {User} from '../redux/authentication/authentication.reducer';
import {GetAllUserResponse} from './dto/UserManagement';

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

  getAllUser(): Observable<GetAllUserResponse> {
    return this.http.get<GetAllUserResponse>(config.baseURI + config.GetAllUser);
  }

}
