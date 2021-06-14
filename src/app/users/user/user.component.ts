import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { loadUser } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  user!: User | null;
  loading!: boolean;
  error!: any;

  private subscription: Subscription = new Subscription();

  constructor(private router: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    const routeSubs: Subscription = this.router.params.subscribe(({ id }) => {
      this.store.dispatch(loadUser({ id }));
    });
    4;
    const storeSubs = this.store
      .select('user')
      .subscribe(({ user, loading, error }) => {
        this.user = user;
        this.loading = loading;
        this.error = error;
      });

    this.subscription.add(storeSubs);
    this.subscription.add(routeSubs);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
