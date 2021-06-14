import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private static PER_PAGE: number = 6;

  constructor(private http: HttpClient) {}

  getUsers(): Promise<User[]> {
    const url: string = `${environment.endpoint}/users`;

    let params: HttpParams = new HttpParams();
    params = params.set('per_page', String(UserService.PER_PAGE));

    return this.http
      .get<User[]>(url, {
        params,
      })
      .pipe(map((result: any) => result.data))
      .toPromise();
  }
}
