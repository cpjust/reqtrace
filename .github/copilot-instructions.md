# ReqTrace Copilot Instructions

## Project Overview
ReqTrace is an open-source requirements management system for traceability, collaboration, review, version control,
and impact analysis of requirements expressed as text and diagrams.

The project includes:
- An React frontend (in the `frontend` directory).
  - Uses Node.js 24 for frontend tooling and build tasks.
- A Java 21 / Spring Boot backend (in the `backend` directory).
- PostgreSQL for persistence.

## General Engineering Principles
- Follow SOLID, DRY, KISS, and clean code principles.
- If principles conflict, prioritize correctness and testability first, then simplicity and readability for small modules, and maintainability for shared or core modules.
- Prefer small, focused functions and classes.
- Avoid deep nesting; refactor complex logic into helper methods.
- Keep cognitive complexity low.
- Avoid magic numbers and magic strings; use named constants.
- Use braces for all if/else blocks, loops, and other multi-line control flow.
- Prefer explicit, readable code over clever code.
- Try to keep line lengths up to 120 characters when possible.
- Use meaningful names for variables, methods, classes, files, and modules.
- New interfaces should be prefixed with an uppercase 'I' (e.g., `IExample`).

## Java / Spring Boot Guidelines
- Use Java 21 language features appropriately.
- Write idiomatic Spring Boot code with clear separation of concerns.
- Keep controllers thin; place business logic in services.
- Use constructor injection instead of field injection.
- Use interfaces when they improve testability, allow multiple implementations, or decouple modules. Avoid interfaces for single concrete implementations used only internally.
- Prefer standard Java collections and stream APIs when they improve readability.
- Write code that is testable and modular.
- Use SLF4J for logging in backend code.
- Avoid unnecessary Lombok usage if it obscures clarity.
- Prefer explicit domain models and DTOs when crossing application boundaries.

## React / JavaScript Guidelines
- See `frontend\AGENTS.md` for detailed React and JavaScript guidelines.

### JavaScript Documentation
- Document all exported/public classes, methods, functions, and interfaces with JSDoc.
- Document private helper functions when the purpose or behavior is not obvious.
- Keep documentation concise, accurate, and useful.
- Do not add comments that merely restate the code.
- Update README.md or related documentation when behavior or structure changes.

## Testing
- Write unit tests for new features and bug fixes.
- Prefer small, focused tests with clear names.
- Keep tests deterministic and easy to understand.
- If tests are flaky, mark as flaky in CI, add deterministic seeds or mocks, and require fixing flakiness before merging. Include guidelines for diagnosing flakes.
- Use mocks only at boundaries.
- Prefer integration tests where behavior crosses service, API, or persistence layers.
- For frontend code, write React unit tests for components, services, guards, and utilities as appropriate.
- For backend code, write JUnit-based unit and integration tests as appropriate.

## Backend Testing
- Service and repository tests should validate business rules and data access behavior.
- Controllers should have request/response tests when endpoints are added.
- Integration tests should cover important flows across the Spring Boot stack.

## Project Structure
- Keep the repository organized by major area, such as frontend, backend, docs, and deploy.
- Put React code under the frontend application area.
- Put Java/Spring Boot code under the backend service area.
- Put deployment and environment assets under deploy/.

## Response to Generators
- When generating code, prefer existing project conventions over introducing new ones.
- Preserve the current architecture unless a change clearly improves maintainability.
- If a task affects both frontend and backend, keep the contract between them explicit and consistent.
