<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const STORAGE_KEY = 'reqtrace-auth';
const router = useRouter();

const username = ref('');
const password = ref('');
const loginError = ref(false);
const touched = ref({ username: false, password: false });

const usernameInvalid = computed(() => !username.value.trim() && touched.value.username);
const passwordInvalid = computed(() => !password.value && touched.value.password);

function login(usernameValue, passwordValue) {
  const normalizedUsername = usernameValue.trim();
  if (normalizedUsername === 'admin' && passwordValue === 'password') {
    const user = { username: normalizedUsername, displayName: 'Administrator' };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return true;
  }

  return false;
}

function handleSubmit(event) {
  event.preventDefault();
  touched.value = { username: true, password: true };
  loginError.value = false;

  if (!username.value.trim() || !password.value) {
    return;
  }

  if (login(username.value, password.value)) {
    router.push('/profile');
    return;
  }

  loginError.value = true;
}
</script>

<template>
  <div class="page-shell">
    <article class="auth-card">
      <header>
        <h1>Sign in</h1>
        <p>Enter your enterprise credentials</p>
      </header>

      <form @submit="handleSubmit" novalidate>
        <label class="field">
          <span>Username</span>
          <input
            v-model="username"
            type="text"
            aria-label="Username"
            autocomplete="username"
            @blur="touched.username = true"
          />
          <small v-if="usernameInvalid">Username is required.</small>
        </label>

        <label class="field">
          <span>Password</span>
          <input
            v-model="password"
            type="password"
            aria-label="Password"
            autocomplete="current-password"
            @blur="touched.password = true"
          />
          <small v-if="passwordInvalid">Password is required.</small>
        </label>

        <div v-if="loginError" class="error-message">Invalid username or password.</div>

        <button class="primary-button" type="submit">Login</button>
      </form>
    </article>
  </div>
</template>
