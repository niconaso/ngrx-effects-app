import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const loadUsers = createAction('[Users] LoadUsers');
export const loadUsersSuccess = createAction(
  '[Users] LoadUsers Success',
  props<{ users: User[] }>()
);

export const loadUsersError = createAction(
  '[Users] LoadUsers Error',
  props<{ payload: any }>()
);
