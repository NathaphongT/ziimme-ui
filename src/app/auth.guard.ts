import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private api: ApiService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.api.isLoggedIn()) {
      return this.api.checkAuth().pipe(
        map(
          (res) => {
            if (res && res.status === 200) {
              console.log('Authentications Success.');
              return true;
            } else {
              console.log('Authentications Failed.');
              localStorage.clear();
              this.router.navigate(['home/session/login']);
              return false;
            }
          },
          (error) => {
            console.log('Authentications Error.');
            localStorage.clear();
            this.router.navigate(['home/session/login']);
            return false;
          }
        )
      );
    } else {
      console.log('Authentications Expires.');
      localStorage.clear();
      this.router.navigate(['home/session/login']);
      return false;
    }
  }
}
