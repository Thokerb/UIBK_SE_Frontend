import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthenticationSelector} from './redux/authentication/authentication.selector';
import {TokenStorageService} from './security/token-storage.service';
import {AuthenticationAction} from './redux/authentication/authentication.action';
import {Router} from '@angular/router';
import {SocketService} from './api/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  loggedIn = false;

  constructor(private store: Store,
              private selector: AuthenticationSelector,
              private tokenStorageService: TokenStorageService,
              private authAction: AuthenticationAction,
              private router: Router,
              private webSocket: SocketService
              ) {
    this.webSocket.connect();
    this.store.select(this.selector.selectAuthStatus).subscribe(next => this.loggedIn = next);
    // so on reload we still have our user
    if (this.tokenStorageService.getUser()){
      this.store.dispatch(this.authAction.setAuthentication({isAuthenticated: true}));
      this.store.dispatch(this.authAction.saveUser({user: this.tokenStorageService.getUser() }));
      this.store.dispatch(this.authAction.setRoles({roles: this.tokenStorageService.getUser().roles}));
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl('/login');
  }
}
