You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking.
- Prefer type inference when the type is obvious.
- Avoid the `any` type; use `unknown` when type is uncertain.

## Angular Best Practices

- Always use standalone components over NgModules.
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management.
- Implement lazy loading for feature routes.
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead.
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.
- Use modern Angular patterns and idiomatic TypeScript.
- Use observables/RxJS for async streams, multi-source composition, or where cancellation/error propagation is needed; use Promises/async for simple one-off async calls.
- Use Angular dependency injection rather than manual service construction.
- Keep templates simple and move complex logic into TypeScript code.
- Use reactive forms for non-trivial forms.
- Follow Angular style guide conventions for naming, structure, and modularity.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

## Components

- Keep components small and focused on a single responsibility.
- Use `input()` and `output()` functions instead of decorators.
- Use `computed()` for derived state.
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator.
- Prefer inline templates for small components.
- Prefer Reactive forms instead of Template-driven ones.
- Do NOT use `ngClass`, use `class` bindings instead.
- Do NOT use `ngStyle`, use `style` bindings instead.
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state.
- Use `computed()` for derived state.
- Keep state transformations pure and predictable.
- Do NOT use `mutate` on signals, use `update` or `set` instead.

## Templates

- Keep templates simple and avoid complex logic.
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`.
- Use the async pipe to handle observables.
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility.
- Use the `providedIn: 'root'` option for singleton services.
- Use the `inject()` function instead of constructor injection.

## Documentation

- Must document all exported/public classes, methods, functions, and interfaces with JSDoc.
- Should document private helper functions when the purpose or behavior is not obvious.
- Keep documentation concise, accurate, and useful.
- Do not add comments that merely restate the code.
- Update README.md or related documentation when behavior or structure changes.

## Testing

### Frontend Testing

- Component tests should verify user-visible behavior, not implementation details.
- Prefer testing public behavior through the DOM and service interactions.
- Keep tests deterministic and focused.
- Avoid brittle tests tied to CSS structure unless the UI depends on it.
