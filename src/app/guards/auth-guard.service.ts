import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login'], {
        queryParams: {
          redirectUri: state.url.replace('/', ''),
        },
      });
      return false;
    }
    return true;
  }

  itsAProfessor() {
    const user = this.auth.getUsuario();
    if(user.tipo != 1){
      this.router.navigate(['']);
    }
    return;
  }

}