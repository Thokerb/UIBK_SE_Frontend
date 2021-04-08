import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Credentials} from './dto/Auth';
import * as config from '../../config/appConfig.json';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: Credentials): Observable<any> {
    return this.http.post(config.baseURI + config.login, {
      username: credentials.username,
      password: credentials.password
    });
  }

  register(user): Observable<any> {
    return this.http.post(config.baseURI + config.register, {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}
