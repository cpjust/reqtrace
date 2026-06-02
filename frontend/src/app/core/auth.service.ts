import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './auth.model';

/**
 * Service for managing user authentication and authorization in the ReqTrace application.
 * Handles login/logout, user state management, and persistent storage of authentication data.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'reqtrace-auth';
  private readonly validUsername = 'admin';
  private readonly validPassword = 'password';

  private currentUserSubject = new BehaviorSubject<User | null>(this.loadUser());
  /**
   * Observable stream of the current authenticated user.
   * Emits the user object when logged in, or null when logged out.
   */
  currentUser$ = this.currentUserSubject.asObservable();

  /**
   * Authenticates a user with the provided credentials.
   * Updates the current user state and persists authentication data to localStorage.
   *
   * @param username - The user's username
   * @param password - The user's password
   * @returns true if authentication was successful, false otherwise
   */
  login(username: string, password: string): boolean {
    const normalizedUsername = username.trim();
    if (
      normalizedUsername === this.validUsername &&
      password === this.validPassword
    ) {
      const user: User = {
        username: normalizedUsername,
        displayName: 'Administrator',
      };
      localStorage.setItem(this.storageKey, JSON.stringify(user));
      this.currentUserSubject.next(user);
      return true;
    }

    return false;
  }

  /**
   * Logs out the current user.
   * Clears authentication data from localStorage and resets the current user state.
   */
  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.currentUserSubject.next(null);
  }

  /**
   * Checks if a user is currently authenticated.
   *
   * @returns true if a user is logged in, false otherwise
   */
  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  /**
   * Retrieves the currently authenticated user.
   *
   * @returns The current user object, or null if no user is authenticated
   */
  getUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Loads the authenticated user from localStorage.
   * Handles deserialization and cleanup of corrupted data.
   *
   * @returns The loaded user object, or null if no user data is found or if deserialization fails
   */
  private loadUser(): User | null {
    const saved = localStorage.getItem(this.storageKey);
    if (!saved) {
      return null;
    }

    try {
      return JSON.parse(saved) as User;
    } catch {
      localStorage.removeItem(this.storageKey);
      return null;
    }
  }
}
