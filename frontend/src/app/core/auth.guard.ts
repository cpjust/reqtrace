import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Route guard that protects authenticated routes.
 * Redirects unauthenticated users to the login page.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  /**
   * Determines if a route can be activated based on authentication status.
   *
   * @returns true if the user is authenticated, or a UrlTree redirecting to login if not
   */
  canActivate(): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    return this.router.createUrlTree(['/login']);
  }
}
