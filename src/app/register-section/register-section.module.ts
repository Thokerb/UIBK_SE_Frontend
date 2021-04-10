import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './register-page/register-page.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {DividerModule} from 'primeng/divider';
import {MessageService, SharedModule} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';



@NgModule({
  declarations: [RegisterPageComponent, RegisterFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    PasswordModule,
    DividerModule,
    SharedModule,
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class RegisterSectionModule { }
