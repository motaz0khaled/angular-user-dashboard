// src/app/user/user-detail/user-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  loading = false;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadUserDetails(Number(id));
    }
  }

  loadUserDetails(id: number): void {
    this.loading = true;
    this.userService.getUserById(id).subscribe(user => {
      this.user = user;
      this.loading = false;
    });
  }
}
