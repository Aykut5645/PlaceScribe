import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class LoginRegisterGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService,
        private store: Store,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.loggedIn()) {
            this.router.navigate([`/auth/users`]);
            return false;
        }

        return true;
    }
}
