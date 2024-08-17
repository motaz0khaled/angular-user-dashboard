// src/app/user/user.actions.ts
import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

export const loadUsers = createAction('[User List] Load Users', props<{ page: number }>());
export const loadUsersSuccess = createAction('[User List] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[User List] Load Users Failure', props<{ error: any }>());
