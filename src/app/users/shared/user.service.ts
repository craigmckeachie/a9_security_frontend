// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from './user.model';
// import * as decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class UserService {
  private usersUrl = environment.apiUrl + 'users/';

  get isLoggedIn() {
    if (localStorage.getItem('auth_token')) {
      if (!this.isTokenExpired) {
        return true;
      }
    } else {
      return false;
    }
  }

  get authenticatedUser() {
    const token = localStorage.getItem('auth_token');
    const helper = new JwtHelperService();
    // const payload = decode(token);
    const payload = helper.decodeToken(token);
    return payload;
  }

  get isTokenExpired() {
    const token = localStorage.getItem('auth_token');
    const helper = new JwtHelperService();
    return helper.isTokenExpired(token);
  }

  constructor(private http: HttpClient) {}

  find(id: number) {
    const authToken = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<User>(this.usersUrl + id, { headers });
  }

  login(email, password) {
    return this.http
      .post(environment.apiUrl + 'auth/login', { email, password })
      .pipe(
        map((res: any) => {
          if (res.success) {
            localStorage.setItem('auth_token', res.access_token);
          }
          return res.success;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(
            'The email or password you have entered is invalid.'
          );
        })
      );
  }

  logout() {
    localStorage.removeItem('auth_token');
  }
}
