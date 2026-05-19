# AI Usage Notes

AI was used as a pair-programming assistant to accelerate scaffolding, test planning, and implementation.

Human review points:

- PostgreSQL and Prisma were selected to match the requested database direction and keep deployment flexible.
- Docker was added as an optional local development convenience, not as a runtime requirement.
- The backend was structured around service and repository boundaries to keep tests fast and code maintainable.
- The seed script was designed with batching because engineers are expected to run it regularly.

AI-generated output should be reviewed through tests, local API checks, and deployment verification before submission.
