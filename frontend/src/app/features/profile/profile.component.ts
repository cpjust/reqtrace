import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../core/auth.service';
import { User } from '../../core/auth.model';

/**
 * User profile component for the ReqTrace application.
 * Displays the current user's information and provides logout functionality.
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
})
export class ProfileComponent {
  /** Observable stream of the current user. */
  user$: Observable<User | null>;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.user$ = this.authService.currentUser$;
  }

  /**
   * Logs out the current user and navigates to the login page.
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
