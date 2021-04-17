import {inject, InjectionToken, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ActionReducer, ActionReducerMap, StoreModule} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import * as fromRoot from './redux/AppState';
import {TodoModule} from './todo/todo.module';
import {ReduxModule} from './redux/redux.module';
import {AppReducer} from './redux/AppReducer';
import {storeLogger} from 'ngrx-store-logger';
import {authInterceptorProviders} from './security/auth.interceptor';
import {LoginSectionModule} from './login-section/login-section.module';
import { EffectsModule } from '@ngrx/effects';
import {AuthenticationEffects} from './redux/authentication/authentication.effect';
import {HttpClientModule} from '@angular/common/http';
import {RegisterSectionModule} from './register-section/register-section.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {SharedModule} from 'primeng/api';
import {UserManagementSectionModule} from './user-management-section/user-management-section.module';
import {GameTopicSectionModule} from './game-topic-section/game-topic-section.module';

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<fromRoot.AppState>>('Registered Reducers', {
  factory: () => {
    const serv = inject(AppReducer);
    // return reducers synchronously
    return{
      TodoState: serv.todoReducer,
      AuthenticationState: serv.authReducer
    };
  }
});

export function logger(reducer: ActionReducer<fromRoot.AppState>): any {
  // default, no options
  return storeLogger()(reducer);
}
export const metaReducers = environment.production ? [] : [logger];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TodoModule,
    HttpClientModule,
    ReduxModule,
    StoreModule.forRoot(REDUCER_TOKEN,
      {
        metaReducers,
        runtimeChecks: {
          strictActionImmutability: true,
          strictActionSerializability: false, // TODO: personally don't like this pattern, but we can discuss it
          strictActionTypeUniqueness: true,
          strictActionWithinNgZone: true,
          strictStateImmutability: true,
          strictStateSerializability: true
        }
      }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    AppRoutingModule,
    LoginSectionModule,
    RegisterSectionModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([AuthenticationEffects]),
    ButtonModule,
    MenubarModule,
    UserManagementSectionModule,
    GameTopicSectionModule,
    SharedModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
