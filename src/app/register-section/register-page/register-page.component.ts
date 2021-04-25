import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AuthenticationSelector} from '../../redux/authentication/authentication.selector';
import {AuthenticationAction} from '../../redux/authentication/authentication.action';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  constructor(private store: Store,
              private selector: AuthenticationSelector,
              private router: Router, private authAction: AuthenticationAction,
              private messageService: MessageService) {

    this.store.select(this.selector.selectRegisterStatus).subscribe(next => {
      if (next){
        this.messageService.add({severity: 'success', summary: 'Registration erfolgreich', detail: 'Weiterleitung auf Login'});
        setTimeout( () => { this.router.navigateByUrl('login'); }, 2000 );
      }
    });
  }

  ngOnInit(): void {
  }

  openLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
