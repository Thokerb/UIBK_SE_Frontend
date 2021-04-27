import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import {InputTextModule} from 'primeng/inputtext';
import { LoginPageComponent } from './login-page/login-page.component';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {FormsModule} from '@angular/forms';
import {RippleModule} from 'primeng/ripple';
import {PasswordModule} from 'primeng/password';
import {ToastModule} from 'primeng/toast';



@NgModule({
  declarations: [LoginFormComponent, LoginPageComponent],
    imports: [
        CommonModule,
        InputTextModule,
        ButtonModule,
        CardModule,
        FormsModule,
        RippleModule,
        PasswordModule,
        ToastModule
    ]
})
export class LoginSectionModule { }
