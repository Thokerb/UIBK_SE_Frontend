import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGamePageComponent } from './create-game-page/create-game-page.component';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [CreateGamePageComponent],
    imports: [
        CommonModule,
        ButtonModule,
        RippleModule,
        FormsModule
    ]
})
export class CreateGameModule { }
