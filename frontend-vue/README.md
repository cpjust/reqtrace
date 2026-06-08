# ReqTrace Vue UI

This folder contains the Vue version of the ReqTrace frontend experience.

## Getting started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

or

```bash
npm install
npm run dev -- --host 0.0.0.0 --strictPort
```

The app will be available at `http://localhost:5174/`.

## Build

Create a production build:

```bash
npm run build
```

## Vue development notes

- Use Vue 3 and the Composition API for new code.
- Keep components small and focused on one responsibility.
- Prefer reusable composables and utility functions for shared logic.
- Use Vue Router for navigation and route-level guards where needed.
- Prefer accessible form controls and semantic HTML.
- Write tests around user-visible behavior.

## Project purpose

This Vue app mirrors the current Angular UI flow for login and profile screens while using Vue tooling and patterns instead of Angular.
