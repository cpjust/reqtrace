You are an expert in Vue 3, TypeScript, modern frontend architecture, and accessible web development. Write functional, maintainable, performant, and easy-to-read code following Vue and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking.
- Prefer type inference when the type is obvious.
- Avoid `any`; use `unknown` when the type is uncertain.
- Prefer small, typed utility functions and explicit interfaces/types for shared data.

## Vue Best Practices

- Prefer Vue 3 with the Composition API and `<script setup>` for clarity and maintainability.
- Keep components small, focused, and easy to reason about.
- Use Vue Router for navigation and route-level guards when needed.
- Keep side effects in composables or lifecycle hooks, and avoid mixing unrelated logic in one component.
- Use computed properties for derived state and avoid unnecessary recalculation.
- Prefer explicit props, emits, and state updates over hidden mutations.
- Keep state transformations pure and predictable.

## Accessibility Requirements

- The UI must be keyboard accessible.
- Use semantic HTML, descriptive labels, and meaningful button text.
- Maintain visible focus states and sufficient color contrast.
- Prefer accessible form validation and ARIA attributes only when they add real value.

## Components and Structure

- Keep files organized by feature or concern.
- Separate presentational UI from business logic when possible.
- Use reusable composables and small helper functions rather than large inline blocks.
- Keep templates simple and move complex logic into utility functions or composables.

## State Management

- Use local component state for simple UI state.
- Use Pinia or dedicated composables for shared app-wide state when appropriate.
- Keep state updates explicit and avoid hidden side effects.

## Styling

- Prefer scoped styles, utility-first classes, or a consistent local stylesheet approach.
- Avoid hard-coded layout patterns when a reusable style token or shared component would be clearer.
- Keep styling readable and maintainable.

## Documentation

- Must document all exported/public classes, methods, functions, and interfaces with JSDoc.
- Should document private helper functions when the purpose or behavior is not obvious.
- Keep documentation concise, accurate, and useful.
- Do not add comments that merely restate the code.
- Update README.md or related documentation when behavior or structure changes.

## Testing

### Frontend Testing

- Write tests for user-visible behavior rather than implementation details.
- Prefer Vue Testing Library for component interaction and DOM behavior.
- Keep tests deterministic and focused.
- Avoid brittle tests tied to CSS structure unless the UI depends on it.
