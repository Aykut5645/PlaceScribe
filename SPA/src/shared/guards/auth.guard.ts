import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    canActivate(next: ActivatedRouteSnapshot): boolean {
        if (!this.authService.loggedIn()) {
            this.router.navigate(['/auth/login']);
            return false;
        }
        return true;
    }
}
