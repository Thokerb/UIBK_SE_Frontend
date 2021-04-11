import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {RestServiceService} from '../../api/rest-service.service';
import {User} from '../../api/dto/UserManagement';

@Component({
  selector: 'app-user-management-table',
  templateUrl: './user-management-table.component.html',
  styleUrls: ['./user-management-table.component.css']
})
export class UserManagementTableComponent implements OnInit {

  users: User[];
  constructor(private store: Store, private restService: RestServiceService) {
    this.restService.getAllUser().subscribe(next => this.users = next.user);
  }

  ngOnInit(): void {
  }

}
