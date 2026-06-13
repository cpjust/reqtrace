You are an expert in React, JavaScript, modern frontend architecture, and accessible web development. Write functional, maintainable, performant, and easy-to-read code following React and JavaScript best practices.

## JavaScript & JSX Best Practices

## JavaScript & JSX Best Practices

*   **Organize Pages into Feature Folders:** Give each distinct page or screen its own dedicated folder. Keep the main page file, its unique sub-components, and its specific styles together in that one folder.
*   **Use PropTypes for Component Inputs:** Since JavaScript lacks a built-in type system, use the `prop-types` library. This ensures components receive the correct data format and warns you in the console if something is wrong.
*   **Keep State and Data Predictable:** Do not change data types randomly. If a state variable starts as an array, keep it as an array. Never change it to a string or a number later on.
*   **Prefer Small, Pure Functions:** Keep your logic functions small and separate from your visual layout. Pass data into them explicitly instead of relying on global variables.
*   **Keep JSX Lean:** Do not put heavy calculations or complex logic inside your `return` statement. Handle the heavy lifting above the `return` so the layout remains clean and easy to read.
*   **Break Down Large Components:** If a component grows larger than 150 to 200 lines of code, split it into smaller, reusable child components.
*   **Always Use Unique Keys:** When mapping over an array to display elements (like a list), always provide a unique `key` prop. Avoid using the array index as the key.
*   **Destructure Props:** Extract your variables at the top of your component. Write `const { title, user } = props;` instead of repeating `props.title` and `props.user` throughout your code.
*   **Write Clear Component Interfaces:** Document the exact shape of objects and shared data using clear comments (like JSDoc) or a shared configuration file so your team knows what data to expect.

### Recommended Folder Structure Example

```text
src/
├── components/          # Shared components used across multiple pages (e.g., Button, Navbar)
├── pages/               # Feature folders for each specific screen
│   ├── Login/
│   │   ├── Login.jsx    # Main page layout for the Login screen
│   │   ├── LoginForm.jsx# Sub-component used only on this page
│   │   └── Login.css    # Styles specific to the Login page
│   └── Dashboard/
│       ├── Dashboard.jsx
│       └── StatCard.jsx
├── App.jsx              # Main app entry where routes are defined
└── main.jsx
```

## React Best Practices

- Prefer functional components and hooks over class components.
- Keep components small, focused, and easy to reason about.
- Use React Router for navigation and route-level guards when needed.
- Keep side effects in `useEffect` or custom hooks, and avoid mixing unrelated logic in one component.
- Use memoization only when it solves a real performance problem.
- Prefer controlled components for forms and explicit state updates.
- Keep state transformations pure and predictable.
- Avoid unnecessary re-renders by splitting components and using stable props.

## Accessibility Requirements

- The UI must be keyboard accessible.
- Use semantic HTML, descriptive labels, and meaningful button text.
- Maintain visible focus states and sufficient color contrast.
- Prefer accessible form validation and ARIA attributes only when they add real value.

## Components and Structure

- Keep files organized by feature or concern.
- Separate presentational UI from business logic when possible.
- Use reusable hooks and small helper functions rather than large inline blocks.
- Keep JSX simple and move complex logic into utility functions or hooks.

## State Management

- Use local component state for simple UI state.
- Use context or dedicated hooks for shared app-wide state when appropriate.
- Keep state updates explicit and avoid hidden side effects.

## Styling

- Prefer CSS modules, utility-first classes, or a consistent local stylesheet approach.
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
- Prefer React Testing Library for component interaction and DOM behavior.
- Keep tests deterministic and focused.
- Avoid brittle tests tied to CSS structure unless the UI depends on it.
