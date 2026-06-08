<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const STORAGE_KEY = 'reqtrace-auth';
const router = useRouter();

const user = computed(() => {
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
});

function logout() {
  localStorage.removeItem(STORAGE_KEY);
  router.push('/login');
}
</script>

<template>
  <div v-if="!user" class="page-shell">
    <article class="auth-card">
      <header>
        <h1>Redirecting</h1>
        <p>Loading your session…</p>
      </header>
    </article>
  </div>

  <div v-else class="page-shell">
    <article class="auth-card profile-card">
      <header>
        <h1>User Profile</h1>
        <p>Secure account details</p>
      </header>

      <section class="profile-details">
        <p><strong>Username:</strong> {{ user.username }}</p>
        <p><strong>Display name:</strong> {{ user.displayName }}</p>
        <p><strong>Role:</strong> Administrator</p>
      </section>

      <footer>
        <button class="secondary-button" type="button" @click="logout">Logout</button>
      </footer>
    </article>
  </div>
</template>
