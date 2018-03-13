// user.service.ts
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { catchError, tap, map } from "rxjs/operators";
import { _throw } from "rxjs/observable/throw";
import { HttpErrorResponse } from "@angular/common/http";
import { environment } from "../environments/environment";
import { User } from "./profile/users/shared/user.model";

@Injectable()
export class UserService {
  private loggedIn = false;
  private usersUrl = environment.apiUrl + "users/";

  constructor(private http: HttpClient) {
    this.loggedIn = !!localStorage.getItem("auth_token");
  }

  find(id: number) {
    const authToken = localStorage.getItem("auth_token");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json"
    });

    return this.http.get<User>(this.usersUrl + id, { headers });
  }

  login(email, password) {
    console.log(environment.apiUrl + "auth/login");
    console.log({ email, password });
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "application/json"
    //   })
    // };

    return this.http
      .post(environment.apiUrl + "auth/login", { email, password })
      .pipe(
        map((res: any) => {
          if (res.success) {
            localStorage.setItem("auth_token", res.access_token);
            this.loggedIn = true;
          }
          return res.success;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return _throw("An error occurred when trying to login.");
        })
      );
  }

  logout() {
    localStorage.removeItem("auth_token");
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
