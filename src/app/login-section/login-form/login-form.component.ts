import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthenticationSelector} from '../../redux/authentication/authentication.selector';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AuthenticationAction} from '../../redux/authentication/authentication.action';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  isAuthenticated: Observable<boolean>;
  username: string;
  password: string;
  constructor(private store: Store, private selector: AuthenticationSelector, private router: Router, private authAction: AuthenticationAction) {
    this.isAuthenticated = this.store.select(this.selector.selectAuthStatus);
    this.isAuthenticated.subscribe(value => {
      if (value){
        router.navigateByUrl('/home');
      }
      else{

      }
    });
  }

  ngOnInit(): void {
  }

  login(): void{
    console.log(this.username,this.password);
    this.store.dispatch(this.authAction.login({credentials: {password: this.password, username: this.username }}));

  }

}
