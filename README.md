# ReqTrace

ReqTrace is an open-source requirements management system designed for traceability, collaboration, review, and version control of requirements expressed as text and diagrams.

It is intended to help teams define, organize, link, review, and evolve requirements over time while keeping a clear history of changes and relationships between artifacts.

## What ReqTrace is for

ReqTrace is used to manage requirements throughout the development lifecycle. It gives teams a central place to capture requirements, connect related items, discuss changes, and understand what might be affected when a requirement changes.

This makes it useful for software teams, systems engineering teams, and anyone who needs structured traceability between requirements and downstream work products.

## What ReqTrace can do

ReqTrace is being built to support requirements in multiple forms, including:

- Text-based requirements.
- Diagram-based requirements.
- Linked requirements with traceable relationships.
- Draft review of related requirements as a collection.
- Publishing reviewed requirements as a new version.
- Comments from multiple people on individual requirements.
- Change impact analysis to identify other requirements that may be affected.

The goal is to make it easier to see how requirements relate to each other and to keep those relationships visible as the system evolves.

## Planned workflow

A typical ReqTrace workflow will look like this:

1. Create or import requirements.
2. Add text, diagrams, and related metadata.
3. Link requirements to other requirements.
4. Invite teammates to review a draft collection.
5. Add comments and iterate on the draft.
6. Publish the collection as a new version.
7. Analyze downstream impact before making a change.

## Technology stack

ReqTrace will use the following stack:

- **Frontend:** Angular
- **Runtime:** Node.js 24
- **Backend:** Java 21
- **Framework:** Spring Boot
- **Database:** PostgreSQL

This stack is intended to keep the frontend modern and responsive while giving the backend a stable, production-ready foundation for APIs, persistence, and future scaling.

## Repository structure

The project is expected to grow into a monorepo with separate top-level folders for major components:

- `frontend/` for the Angular application.
- `backend/` for the Java / Spring Boot services.
- `docs/` for design notes, architecture, and usage documentation.
- `deploy/` for deployment, container, and environment configuration.

## Status

ReqTrace is currently in early development and focused on proof of concept work.

The first milestone is the main web app, followed by backend services and database integration.

## Contributing

Contributions are welcome once the project structure stabilizes. A contribution guide, issue templates, and development setup instructions will be added as the project matures.

## License

Licensed under the Apache License, Version 2.0.
See the [LICENSE](LICENSE) file for details.

## Roadmap

Planned future work includes:

- Requirement versioning.
- Better diagram editing and viewing.
- Review workflows.
- Comment notifications.
- Search and filtering.
- Import/export support.
- Role-based permissions.
- Impact analysis visualization.
- API and service hardening.

## Project goals

ReqTrace aims to make requirements management clearer, more collaborative, and more traceable by combining text, diagrams, reviews, and version history in one system.

## Notes

This project is being designed with long-term traceability and review workflows in mind. The architecture will evolve as the product matures, but the goal remains the same: make it easier to understand what a requirement is, how it connects to others, and what changes might be affected when it evolves.
