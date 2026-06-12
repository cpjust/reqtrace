import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Login';

describe('LoginPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('accepts valid credentials and navigates to the profile page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<h1>User Profile</h1>} />
        </Routes>
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText('Username'), 'admin');
    await user.type(screen.getByLabelText('Password'), 'password');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByRole('heading', { name: /user profile/i })).toBeInTheDocument();
    expect(localStorage.getItem('reqtrace-auth')).toContain('Administrator');
  });

  it('shows an error for invalid credentials', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText('Username'), 'wrong');
    await user.type(screen.getByLabelText('Password'), 'wrong');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText('Invalid username or password.')).toBeInTheDocument();
    expect(localStorage.getItem('reqtrace-auth')).toBeNull();
  });
});
