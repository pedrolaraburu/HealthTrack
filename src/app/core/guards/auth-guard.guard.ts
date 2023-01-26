import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription, take } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private _authService: AuthService, private router: Router){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this._authService.isLoggedIn()) {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    }
}
