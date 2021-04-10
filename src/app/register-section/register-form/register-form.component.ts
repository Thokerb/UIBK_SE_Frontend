import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthenticationSelector} from '../../redux/authentication/authentication.selector';
import {Router} from '@angular/router';
import {AuthenticationAction} from '../../redux/authentication/authentication.action';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  username: string;
  password: string;
  email: string;
  registerFormGroup: FormGroup;



  constructor(private store: Store,
              private selector: AuthenticationSelector,
              private router: Router, private authAction: AuthenticationAction) {
  }

  ngOnInit(): void {
    this.registerFormGroup = new FormGroup({
      usernameControl: new FormControl('', [Validators.minLength(3), Validators.required]),
      emailControl: new FormControl('', [Validators.required, Validators.email]),
      passwordControl: new FormControl('', [Validators.minLength(6), Validators.required])
    });

  }

  register(): void {
    console.log(this.registerFormGroup);
    this.store.dispatch(this.authAction.register({credentials: {password: this.password, username: this.username, email: this.email}}));
  }
}
