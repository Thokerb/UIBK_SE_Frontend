import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './todo/dashboard/dashboard.component';
import {LoginPageComponent} from './login-section/login-page/login-page.component';
import {RegisterPageComponent} from './register-section/register-page/register-page.component';
import {UserManagementPageComponent} from './user-management-section/user-management-page/user-management-page.component';
import {GameTopicPageComponent} from './game-topic-section/game-topic-page/game-topic-page.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'admin/usermanagement', component: UserManagementPageComponent},
  {path: 'gametopic', component: GameTopicPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

