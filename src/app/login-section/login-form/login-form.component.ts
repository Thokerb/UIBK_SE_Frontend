import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthenticationSelector} from '../../redux/authentication/authentication.selector';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AuthenticationAction} from '../../redux/authentication/authentication.action';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  isAuthenticated: Observable<boolean>;
  username: string;
  password: string;
  last: boolean;
  private loginErrorSubscription: Subscription;
  constructor(private store: Store, private selector: AuthenticationSelector, private router: Router, private authAction: AuthenticationAction,
              private messageService: MessageService) {
    this.isAuthenticated = this.store.select(this.selector.selectAuthStatus);
    this.loginErrorSubscription = this.store.select(this.selector.selectLoginErrorStatus).subscribe(next => {
      if (next && this.last !== next){
        this.messageService.add({severity: 'error', summary: 'Login', detail: `Falscher Benutzername oder Passwort!`});
        this.store.dispatch(authAction.setLoginError({status: false}));
      }
      else{

      }
      this.last = next;
    });
    this.isAuthenticated.subscribe(value => {
      if (value){
        this.loginErrorSubscription.unsubscribe();
        router.navigateByUrl('/dashboard');
      }
      else{
        console.log("error");

      }
    });
  }

  ngOnInit(): void {
  }

  login(): void{
    this.store.dispatch(this.authAction.login({credentials: {password: this.password, username: this.username }}));
  }

}
