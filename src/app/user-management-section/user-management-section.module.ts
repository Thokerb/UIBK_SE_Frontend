import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementPageComponent } from './user-management-page/user-management-page.component';
import { UserManagementTableComponent } from './user-management-table/user-management-table.component';
import {SharedModule} from 'primeng/api';
import {TableModule} from 'primeng/table';



@NgModule({
  declarations: [UserManagementPageComponent, UserManagementTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    TableModule
  ]
})
export class UserManagementSectionModule { }
