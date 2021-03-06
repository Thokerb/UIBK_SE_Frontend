import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthenticationSelector} from '../../redux/authentication/authentication.selector';
import {Router} from '@angular/router';
import {AuthenticationAction} from '../../redux/authentication/authentication.action';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {REGISTER_ERROR} from '../../redux/authentication/authentication.reducer';
import {MessageService} from 'primeng/api';

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
  registerError: REGISTER_ERROR;
  usernameTaken = false;



  constructor(private store: Store,
              private selector: AuthenticationSelector,
              private router: Router, private authAction: AuthenticationAction,
              private messageService: MessageService) {

    this.store.select(this.selector.selectRegisterError).subscribe(next => {
      this.registerError = next;
      switch (next) {
        case REGISTER_ERROR.NONE:
          break;
        case REGISTER_ERROR.USERNAME_TAKEN:
          this.messageService.add({severity: 'error', summary: 'Benutzername', detail: 'Benutzername bereits vergeben'});
          break;
        case REGISTER_ERROR.EMAILTAKEN:
          this.messageService.add({severity: 'error', summary: 'Email', detail: 'Email bereits vergeben'});
          break;
      }

    });
  }

  ngOnInit(): void {
    this.registerFormGroup = new FormGroup({
      usernameControl: new FormControl('', [Validators.minLength(3), Validators.required]),
      emailControl: new FormControl('', [Validators.required, Validators.email]),
      passwordControl: new FormControl('', [Validators.minLength(6), Validators.required])
    });

  }

  register(): void {
    this.store.dispatch(this.authAction.register({credentials: {password: this.password, username: this.username, email: this.email}}));
  }
}
