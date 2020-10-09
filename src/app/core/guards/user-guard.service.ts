import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from 'src/app/modules/authorization/authorization.service';
@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private auth: AuthorizationService, private router: Router) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.auth.loggedIn()) {
      return true;
    }
    this.router.navigateByUrl('/');
    return false;
  }
}
