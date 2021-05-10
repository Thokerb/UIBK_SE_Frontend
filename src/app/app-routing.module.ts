import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './todo/dashboard/dashboard.component';
import {LoginPageComponent} from './login-section/login-page/login-page.component';
import {RegisterPageComponent} from './register-section/register-page/register-page.component';
import {UserManagementPageComponent} from './user-management-section/user-management-page/user-management-page.component';
import {GameTopicPageComponent} from './game-topic-section/game-topic-page/game-topic-page.component';
import {GameLobbyPageComponent} from './game-lobby-section/game-lobby-page/game-lobby-page.component';
import {GamePageComponent} from './game-section/game-page/game-page.component';
import {CubePageComponent} from './cube-section/cube-page/cube-page.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'admin/usermanagement', component: UserManagementPageComponent},
  {path: 'gametopic', component: GameTopicPageComponent },
  {path: 'gamelobby', component: GameLobbyPageComponent },
  {path: 'game/:id', component: GamePageComponent },
  {path: 'cube', component: CubePageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

