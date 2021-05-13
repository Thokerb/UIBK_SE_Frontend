import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {TodoSelector} from '../../redux/todo/todo.selector';
import {TodoReducer} from '../../redux/todo/todo.reducer';
import {TodoAction} from '../../redux/todo/todo.action';
import {RestServiceService} from '../../api/rest-service.service';
import {SocketService} from '../../api/socket.service';
import {Router} from '@angular/router';
import {AuthenticationSelector} from '../../redux/authentication/authentication.selector';
import {User} from '../../api/dto/UserManagement';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent implements OnInit {

  user: Partial<User> | null;
  constructor(private store: Store,
              private restService: RestServiceService,
              private webSocket: SocketService,
              private router: Router,
              private authSelector: AuthenticationSelector
              ) {
    this.user = null;
  }

  ngOnInit(): void {

    this.store.select(this.authSelector.selectCurrentUser).subscribe(userResult => {
      this.user = userResult;
    });
  }

  sendToSocket(): void {
    this.webSocket.send();
  }
}
