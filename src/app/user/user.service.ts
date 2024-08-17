// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersCache: Map<number, User> = new Map();
  private searchResults: BehaviorSubject<User[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<User[]> {
    const cacheKey = `page-${page}`;
    if (this.usersCache.has(cacheKey)) {
      return this.usersCache.get(cacheKey);
    }

    return this.http.get<{ data: User[] }>(`https://reqres.in/api/users?page=${page}`).pipe(
      map(response => response.data),
      tap(users => this.cacheUsers(cacheKey, users)),
      catchError(error => {
        console.error('Error fetching users:', error);
        return [];
      })
    );
  }

  getUserDetails(userId: number): Observable<User> {
    if (this.usersCache.has(userId)) {
      return this.usersCache.get(userId);
    }

    return this.http.get<{ data: User }>(`https://reqres.in/api/users/${userId}`).pipe(
      map(response => response.data),
      tap(user => this.cacheUser(user.id, user)),
      catchError(error => {
        console.error('Error fetching user details:', error);
        return [];
      })
    );
  }

  searchUsers(searchTerm: string): Observable<User[]> {
    if (searchTerm.trim() === '') {
      this.searchResults.next([]);
      return this.searchResults.asObservable();
    }

    return this.http.get<{ data: User[] }>(`https://reqres.in/api/users?page=1&delay=1&q=${searchTerm}`).pipe(
      map(response => response.data),
      tap(users => this.searchResults.next(users)),
      catchError(error => {
        console.error('Error searching users:', error);
        this.searchResults.next([]);
        return [];
      })
    );
  }

  private cacheUsers(cacheKey: string, users: User[]) {
    this.usersCache.set(cacheKey, users);
  }

  private cacheUser(userId: number, user: User) {
    this.usersCache.set(userId, user);
  }
}