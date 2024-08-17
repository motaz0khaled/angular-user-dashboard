// app.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserService } from './services/user.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users$: Observable<User[]>;
  currentPage = 1;
  searchTerm = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers(page = this.currentPage) {
    this.users$ = this.userService.getUsers(page);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchUsers(page);
  }

  onSearch() {
    this.users$ = this.userService.searchUsers(this.searchTerm);
  }

  viewUserDetails(userId: number) {
    this.router.navigate(['/users', userId]);
  }
}