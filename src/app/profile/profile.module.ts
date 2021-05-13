import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [UserProfilePageComponent],
    imports: [
        CommonModule,
        ButtonModule,
        RippleModule,
        FormsModule
    ]
})
export class ProfileModule { }
