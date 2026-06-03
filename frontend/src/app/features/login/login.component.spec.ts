import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';
import { AuthService } from '../../core/auth.service';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let router: Router;
  let authService: AuthService;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        RouterTestingModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should login with valid credentials and navigate to the profile page', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    const nativeElement = fixture.nativeElement as HTMLElement;
    const usernameInput = nativeElement.querySelector('input[formcontrolname="username"]') as HTMLInputElement;
    const passwordInput = nativeElement.querySelector('input[formcontrolname="password"]') as HTMLInputElement;
    const submitButton = nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement;

    usernameInput.value = 'admin';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'password';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(submitButton.disabled).toBe(false);

    submitButton.click();
    fixture.detectChanges();

    expect(authService.isLoggedIn()).toBe(true);
    expect(navigateSpy).toHaveBeenCalledWith(['/profile']);
  });

  it('should show an error for invalid credentials', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    const usernameInput = nativeElement.querySelector('input[formcontrolname="username"]') as HTMLInputElement;
    const passwordInput = nativeElement.querySelector('input[formcontrolname="password"]') as HTMLInputElement;
    const submitButton = nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement;

    usernameInput.value = 'wrong';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'wrong';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(submitButton.disabled).toBe(false);

    submitButton.click();
    fixture.detectChanges();

    const errorMessage = nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage?.textContent).toContain('Invalid username or password.');
    expect(authService.isLoggedIn()).toBe(false);
  });

  it('should display required validation messages after typing and clearing inputs', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    const usernameInput = nativeElement.querySelector('input[formcontrolname="username"]') as HTMLInputElement;
    const passwordInput = nativeElement.querySelector('input[formcontrolname="password"]') as HTMLInputElement;

    usernameInput.value = 'a';
    usernameInput.dispatchEvent(new Event('input'));
    usernameInput.value = '';
    usernameInput.dispatchEvent(new Event('input'));
    usernameInput.dispatchEvent(new Event('blur'));

    passwordInput.value = 'a';
    passwordInput.dispatchEvent(new Event('input'));
    passwordInput.value = '';
    passwordInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    const errorElements = nativeElement.querySelectorAll('mat-error');
    expect(errorElements.length).toBe(2);
    expect(errorElements[0].textContent?.trim()).toBe('Username is required.');
    expect(errorElements[1].textContent?.trim()).toBe('Password is required.');
  });

  it('should disable the Login button when username or password is blank', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    const usernameInput = nativeElement.querySelector('input[formcontrolname="username"]') as HTMLInputElement;
    const passwordInput = nativeElement.querySelector('input[formcontrolname="password"]') as HTMLInputElement;
    const submitButton = nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement;

    usernameInput.value = '';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.value = '';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(submitButton.disabled).toBe(true);

    usernameInput.value = 'admin';
    usernameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(submitButton.disabled).toBe(true);

    usernameInput.value = '';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'password';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(submitButton.disabled).toBe(true);
  });
});