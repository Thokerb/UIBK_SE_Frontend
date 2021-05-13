import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {TodoSelector} from '../../redux/todo/todo.selector';
import {RestServiceService} from '../../api/rest-service.service';
import {SocketService} from '../../api/socket.service';
import {Router} from '@angular/router';
import {AuthenticationSelector} from '../../redux/authentication/authentication.selector';
import {USER_ROLES} from "../../api/dto/UserManagement";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userRoles: USER_ROLES[];
  isAdmin: boolean;
  isOrganizer: boolean;
  constructor(private store: Store,
              private todoSelector: TodoSelector,
              private restService: RestServiceService,
              private webSocket: SocketService,
              private router: Router,
              private selector: AuthenticationSelector
  ) {
    this.userRoles = [];
    this.isAdmin = false;
  }

  ngOnInit(): void {
    this.store.select(this.selector.selectRoles).subscribe(rolesResult => {
      this.userRoles = rolesResult;
      this.isAdmin = this.userRoles.includes(USER_ROLES.ADMIN);
      this.isOrganizer = this.userRoles.includes(USER_ROLES.ORGANIZER);
    });
  }

  onLobbyBtn(): void {
    this.router.navigateByUrl('/gamelobby');
  }

  onCreateGameBtn(): void {
    this.router.navigateByUrl('/createGame');
  }

  onPlayerProfileBtn(): void {
    this.router.navigateByUrl('/profile');
  }

  openCubeSite(): void {
    this.router.navigateByUrl('/cube');
  }

  onStatsBtn(): void {
    this.router.navigateByUrl('/statistics');
  }

  // TODO authentication

  onUserManagementBtn(): void {
    this.router.navigateByUrl('/admin/usermanagement');
  }

  onTopicsBtn(): void {
    this.router.navigateByUrl('/gametopic');
  }

  sendToSocket(): void {
    this.webSocket.send();
  }
}
