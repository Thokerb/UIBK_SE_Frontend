import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {TodoSelector} from '../../redux/todo/todo.selector';
import {TodoReducer} from '../../redux/todo/todo.reducer';
import {TodoAction} from '../../redux/todo/todo.action';
import {RestServiceService} from '../../api/rest-service.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  todo: Observable<string[]>;
  constructor(private store: Store, private todoSelector: TodoSelector, private router: Router, private restService: RestServiceService) { }

  ngOnInit(): void {
    this.todo = this.store.select(this.todoSelector.selectAllTodos);
  }

  notYetImplemented(): void {
    console.warn('Not yet implemented');
  }

  onLobbyBtn(): void {
    this.router.navigateByUrl('/lobby');
  }

  onCreateGameBtn(): void {
    this.router.navigateByUrl('/createGame');
  }

  onPlayerProfileBtn(): void {
    this.router.navigateByUrl('/profile');
  }

  callResource(): void {
    this.restService.getTeam().subscribe(next=>{
      console.log(next);
    });
  }

}
