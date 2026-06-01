import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'reqtrace-auth';
  private readonly validUsername = 'admin';
  private readonly validPassword = 'password';

  private currentUserSubject = new BehaviorSubject<User | null>(this.loadUser());
  currentUser$ = this.currentUserSubject.asObservable();

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

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getUser(): User | null {
    return this.currentUserSubject.value;
  }

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
