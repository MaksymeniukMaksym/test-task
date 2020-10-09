import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private http: HttpClient, private router: Router) {}

  public registerUser(firstName, lastName, email, password): any {
    localStorage.clear();
    return this.http
      .post<User>(`${environment.api}/auth/sign-up`, {
        firstName,
        lastName,
        email,
        password,
      })
      .pipe(
        tap(() => {
          this.router.navigateByUrl('/auth/sign-in');
        })
      );
  }
  public loginUser(email, password): any {
    localStorage.clear();
    return this.http
      .post<any>(`${environment.api}/auth/sign-in`, {
        email,
        password,
      })
      .pipe(
        tap((res) => {
          console.log();
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl('/');
        })
      );
  }

  public loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }
}
