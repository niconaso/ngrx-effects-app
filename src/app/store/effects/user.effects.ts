import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { merge, of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import * as userActions from '../actions';

@Injectable()
export class UserEffects {
  /**
   * Creates an instance of UsersEffects.
   * @param {Actions} actions$
   * @param {UserService} userService
   * @memberof UsersEffects
   */
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadUser),
      mergeMap((action) =>
        this.userService.getUser(action.id).pipe(
          map((user: User) => userActions.loadUserSuccess({ user })),
          catchError((error: any) =>
            of(userActions.loadUserError({ payload: error }))
          )
        )
      )
    )
  );
}
