import { mount, flushPromises } from '@vue/test-utils';
import { createMemoryHistory, createRouter } from 'vue-router';
import App from './App.vue';
import LoginPage from './views/LoginPage.vue';
import ProfilePage from './views/ProfilePage.vue';

const STORAGE_KEY = 'reqtrace-auth';

function createTestRouter(initialEntry = '/login') {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/login', component: LoginPage },
      {
        path: '/profile',
        component: ProfilePage,
        beforeEnter: (to, from, next) => {
          const saved = localStorage.getItem(STORAGE_KEY);
          if (saved) {
            next();
            return;
          }

          next('/login');
        },
      },
      { path: '/', redirect: '/login' },
      { path: '/:pathMatch(.*)*', redirect: '/login' },
    ],
  });
}

describe('ReqTrace Vue UI', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('shows the login form and accepts valid credentials', async () => {
    const router = createTestRouter('/login');
    const wrapper = mount(App, { global: { plugins: [router] } });

    await router.push('/login');
    await router.isReady();

    await wrapper.find('input[aria-label="Username"]').setValue('admin');
    await wrapper.find('input[aria-label="Password"]').setValue('password');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    expect(router.currentRoute.value.fullPath).toBe('/profile');
    expect(localStorage.getItem(STORAGE_KEY)).toContain('Administrator');
    expect(wrapper.text()).toContain('User Profile');
  });

  it('shows an error for invalid credentials', async () => {
    const router = createTestRouter('/login');
    const wrapper = mount(App, { global: { plugins: [router] } });

    await router.push('/login');
    await router.isReady();

    await wrapper.find('input[aria-label="Username"]').setValue('wrong');
    await wrapper.find('input[aria-label="Password"]').setValue('wrong');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    expect(wrapper.text()).toContain('Invalid username or password.');
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('shows user details on the profile page and logs the user out', async () => {
    const router = createTestRouter('/profile');
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ username: 'admin', displayName: 'Administrator' }));

    const wrapper = mount(App, { global: { plugins: [router] } });

    await router.push('/profile');
    await router.isReady();
    await flushPromises();

    expect(wrapper.text()).toContain('admin');
    expect(wrapper.text()).toContain('Administrator');

    await wrapper.find('button').trigger('click');
    await flushPromises();

    expect(router.currentRoute.value.fullPath).toBe('/login');
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
