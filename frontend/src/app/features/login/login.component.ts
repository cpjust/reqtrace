import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../core/auth.service';

/**
 * Login component for user authentication in the ReqTrace application.
 * Provides a login form with username and password fields.
 * Handles authentication errors and navigation after successful login.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class LoginComponent {
  /** The reactive form for login inputs. */
  loginForm: FormGroup;
  /** Flag indicating whether a login error occurred. */
  loginError = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  /**
   * Getter for the username form control.
   *
   * @returns The username form control
   */
  get username() {
    return this.loginForm.get('username');
  }

  /**
   * Getter for the password form control.
   *
   * @returns The password form control
   */
  get password() {
    return this.loginForm.get('password');
  }

  /**
   * Handles form submission for user login.
   * Validates the form, authenticates the user, and navigates to the profile page on success.
   * Sets an error flag if authentication fails.
   */
  onSubmit(): void {
    this.loginError = false;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const username = this.username?.value as string;
    const password = this.password?.value as string;

    if (this.authService.login(username, password)) {
      this.router.navigate(['/profile']);
      return;
    }

    this.loginError = true;
  }
}
