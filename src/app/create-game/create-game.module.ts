import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGamePageComponent } from './create-game-page/create-game-page.component';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {SliderModule} from "primeng/slider";
import {DropdownModule} from "primeng/dropdown";
import {ListboxModule} from "primeng/listbox";
import {InputNumberModule} from "primeng/inputnumber";

@NgModule({
  declarations: [CreateGamePageComponent],
    imports: [
        CommonModule,
        ButtonModule,
        RippleModule,
        FormsModule,
        InputTextModule,
        SliderModule,
        DropdownModule,
        ListboxModule,
        InputNumberModule
    ]
})
export class CreateGameModule { }
