import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import * as userActions from '../actions';

@Injectable()
export class UsersEffects {
  /**
   * Creates an instance of UsersEffects.
   * @param {Actions} actions$
   * @param {UserService} userService
   * @memberof UsersEffects
   */
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((users: User[]) => userActions.loadUsersSuccess({ users })),
          catchError((error: any) =>
            of(userActions.loadUsersError({ payload: error }))
          )
        )
      )
    )
  );
}
