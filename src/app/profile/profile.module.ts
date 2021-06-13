import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {CardModule} from "primeng/card";


@NgModule({
  declarations: [UserProfilePageComponent],
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    BrowserModule,
    FormsModule,
    CardModule
  ]
})
export class ProfileModule { }
