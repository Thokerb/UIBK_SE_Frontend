import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {RestServiceService} from '../../api/rest-service.service';
import {User} from '../../api/dto/UserManagement';
import {MessageService} from 'primeng/api';
import {AuthenticationSelector} from '../../redux/authentication/authentication.selector';
import * as AuthData from 'src/app/redux/authentication/authentication.reducer';

@Component({
  selector: 'app-user-management-table',
  templateUrl: './user-management-table.component.html',
  styleUrls: ['./user-management-table.component.css']
})
export class UserManagementTableComponent implements OnInit {

  users: User[];
  editUser: User;
  error: string;
  displayModal: boolean;
  currentUser: AuthData.User;
  constructor(private store: Store,
              private restService: RestServiceService,
              private messageService: MessageService,
              private authSelector: AuthenticationSelector) {
    this.getUser();
    this.store.select(this.authSelector.selectCurrentUser).subscribe(next => this.currentUser = next);
  }

  ngOnInit(): void {
  }

  edit(user: User): void {
    this.displayModal = true;
    this.editUser = user;

  }

  delete(user: User): void {
    if (user.id === this.currentUser.id){
      this.messageService.add({severity: 'error', summary: 'Benutzer', detail: 'Eigenen Benutzer löschen nicht möglich'});
      return;

    }
    this.restService.deleteUser(user.id).subscribe(next => {
      this.getUser();
      this.messageService.add({severity: 'success', summary: 'Benutzer', detail: `Benutzer ${user.username} erfolgreich gelöscht.`});

    },
      error => {
        this.getUser();
        this.messageService.add({severity: 'error', summary: 'Benutzer', detail: 'Benutzer löschen nicht möglich'});
      }
      );
  }

  getUser(): void{
    this.restService.getAllUser().subscribe(next => {
      this.users = next;
      console.log(next);

    },
      error => {
        this.messageService.add({severity: 'error', summary: 'User', detail: 'User nicht erreichbar'});
        this.error = JSON.stringify(error);

      }
      );
  }
}
