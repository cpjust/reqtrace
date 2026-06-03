import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../core/auth.service';
import { ProfileComponent } from './profile.component';
import { Router } from '@angular/router';

describe('ProfileComponent', () => {
  let fixture: ComponentFixture<ProfileComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [ProfileComponent, RouterTestingModule, NoopAnimationsModule, MatButtonModule, MatCardModule],
      providers: [AuthService],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    authService.login('admin', 'password');

    fixture = TestBed.createComponent(ProfileComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should display the correct user details', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    expect(nativeElement.textContent).toContain('Username: admin');
    expect(nativeElement.textContent).toContain('Display name: Administrator');
    expect(nativeElement.textContent).toContain('Role: Administrator');
  });

  it('should end the session and navigate to login when Logout is clicked', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    const nativeElement = fixture.nativeElement as HTMLElement;
    const logoutButton = nativeElement.querySelector('button') as HTMLButtonElement;

    logoutButton.click();
    fixture.detectChanges();

    expect(localStorage.getItem('reqtrace-auth')).toBeNull();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});