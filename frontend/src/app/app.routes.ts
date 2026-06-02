import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { ProfileComponent } from './features/profile/profile.component';
import { AuthGuard } from './core/auth.guard';

/**
 * Application routing configuration for the ReqTrace frontend.
 * Defines routes for authentication and profile pages with route guards.
 * - '/login': Public login page
 * - '/profile': Protected profile page (requires authentication)
 * - '': Redirects to login
 * - '**': Wildcard redirects to login
 */
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
