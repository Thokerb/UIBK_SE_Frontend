import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementPageComponent } from './user-management-page/user-management-page.component';
import { UserManagementTableComponent } from './user-management-table/user-management-table.component';
import {SharedModule} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {InputSwitchModule} from 'primeng/inputswitch';
import {FormsModule} from '@angular/forms';
import {MultiSelectModule} from 'primeng/multiselect';



@NgModule({
  declarations: [UserManagementPageComponent, UserManagementTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    TableModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    InputSwitchModule,
    FormsModule,
    MultiSelectModule
  ]
})
export class UserManagementSectionModule { }
