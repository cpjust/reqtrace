import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './views/LoginPage.vue';
import ProfilePage from './views/ProfilePage.vue';

const STORAGE_KEY = 'reqtrace-auth';

function getStoredUser() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'login', component: LoginPage },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage,
      beforeEnter: (to, from, next) => {
        if (getStoredUser()) {
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

export default router;
