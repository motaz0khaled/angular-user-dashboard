// src/app/user/user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { loadUsersSuccess } from './user.actions';
import { User } from './user.model';

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users }) => ({ ...state, users }))
);

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}
