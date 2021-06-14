import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const loadUser = createAction(
  '[User] LoadUser',
  props<{ id: string }>()
);
export const loadUserSuccess = createAction(
  '[User] LoadUser Success',
  props<{ user: User }>()
);

export const loadUserError = createAction(
  '[User] loadUser Error',
  props<{ payload: any }>()
);
