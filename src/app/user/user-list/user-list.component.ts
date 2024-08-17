// src/app/user/user-list/user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers(1); // Load first page
  }

  loadUsers(page: number): void {
    this.loading = true;
    this.userService.getUsers(page).subscribe(users => {
      this.users = users;
      this.loading = false;
    });
  }

  searchUser(searchTerm: string): void {
    // Implement your search logic here
    // This can filter the users list based on the search term
  }

  navigateToDetail(id: number): void {
    this.router.navigate(['/user', id]);
  }
}
