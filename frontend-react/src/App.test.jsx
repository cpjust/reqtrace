import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('ReqTrace React UI', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('shows the login form and accepts valid credentials', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
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
        <App />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText('Username'), 'wrong');
    await user.type(screen.getByLabelText('Password'), 'wrong');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText('Invalid username or password.')).toBeInTheDocument();
    expect(localStorage.getItem('reqtrace-auth')).toBeNull();
  });

  it('shows user details on the profile page and logs the user out', async () => {
    const user = userEvent.setup();
    localStorage.setItem('reqtrace-auth', JSON.stringify({ username: 'admin', displayName: 'Administrator' }));

    render(
      <MemoryRouter initialEntries={['/profile']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('admin')).toBeInTheDocument();
    expect(screen.getAllByText('Administrator').length).toBeGreaterThanOrEqual(2);

    await user.click(screen.getByRole('button', { name: /logout/i }));

    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
    expect(localStorage.getItem('reqtrace-auth')).toBeNull();
  });
});
