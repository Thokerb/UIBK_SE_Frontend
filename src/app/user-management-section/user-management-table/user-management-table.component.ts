import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {RestServiceService} from '../../api/rest-service.service';
import {User, USER_ROLES} from '../../api/dto/UserManagement';
import {MessageService} from 'primeng/api';
import {AuthenticationSelector} from '../../redux/authentication/authentication.selector';
import * as AuthData from 'src/app/redux/authentication/authentication.reducer';


export interface Options {
  name: string;
  code: USER_ROLES;
}

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
  enabledEdit: boolean;
  selectedRoles: Options[];
  allRoles: Options[];
  constructor(private store: Store,
              private restService: RestServiceService,
              private messageService: MessageService,
              private authSelector: AuthenticationSelector) {
    this.getUser();
    this.store.select(this.authSelector.selectCurrentUser).subscribe(next => this.currentUser = next);
    this.allRoles = [
      {name: USER_ROLES[USER_ROLES.PLAYER], code: USER_ROLES.PLAYER},
      {name: USER_ROLES[USER_ROLES.ORGANIZER], code: USER_ROLES.ORGANIZER},
      {name: USER_ROLES[USER_ROLES.ADMIN], code: USER_ROLES.ADMIN}
    ];
  }

  ngOnInit(): void {
  }

  edit(user: User): void {
    this.displayModal = true;
    this.editUser = user;
    this.enabledEdit = this.editUser.enabled;
    const r: Options[] = user.roles.map(x => {
      return {name: x as unknown as string, code: USER_ROLES[x] as unknown as USER_ROLES};
    });
    this.selectedRoles = r;



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

    },
      error => {
        this.messageService.add({severity: 'error', summary: 'User', detail: 'User nicht erreichbar'});
        this.error = JSON.stringify(error);

      }
      );
  }

  changeEnabled($event: any) {
    this.enabledEdit = $event.checked;
  }

  savePatch(): void {
    this.displayModal = false;
    this.restService.updateUser({enabled: this.enabledEdit, roles: this.selectedRoles.map(x => x.code)}, this.editUser.id).subscribe(next => {
        this.getUser();
        this.messageService.add({severity: 'success', summary: 'Benutzer', detail: `Benutzer ${this.editUser.username} erfolgreich geupdatet.`});

      },
      error => {
        this.getUser();
        this.messageService.add({severity: 'error', summary: 'Benutzer', detail: `Benutzer ${this.editUser.username} konnte nicht geupdatet werden.`});
      }
    );

  }
}
