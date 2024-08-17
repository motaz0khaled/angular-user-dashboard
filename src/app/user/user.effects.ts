// src/app/user/user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { UserService } from './user.service';
import { loadUsers, loadUsersSuccess, loadUsersFailure } from './user.actions';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(action =>
        this.userService.getUsers(action.page).pipe(
          map(users => loadUsersSuccess({ users })),
          catchError(error => loadUsersFailure({ error }))
        )
      )
    )
  );
}
