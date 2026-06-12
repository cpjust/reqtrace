import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProfilePage from './Profile';

describe('ProfilePage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders user details and logs the user out', async () => {
    const user = userEvent.setup();
    localStorage.setItem('reqtrace-auth', JSON.stringify({ username: 'admin', displayName: 'Administrator' }));

    render(
      <MemoryRouter initialEntries={['/profile']}>
        <Routes>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<h1>Sign in</h1>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('admin')).toBeInTheDocument();
    expect(screen.getAllByText('Administrator').length).toBeGreaterThanOrEqual(2);

    await user.click(screen.getByRole('button', { name: /logout/i }));

    expect(await screen.findByRole('heading', { name: /sign in/i })).toBeInTheDocument();
    expect(localStorage.getItem('reqtrace-auth')).toBeNull();
  });
});
