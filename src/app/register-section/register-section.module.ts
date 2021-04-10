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
import {SharedModule} from 'primeng/api';



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
    ReactiveFormsModule
  ]
})
export class RegisterSectionModule { }
