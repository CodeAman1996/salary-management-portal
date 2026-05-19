# TDD Approach

The development approach follows the Red, Green, Refactor loop.

## First Backend Slice

1. Red: define employee service tests for create, update, and missing employee behavior.
2. Green: implement the smallest service and repository contracts needed to satisfy the tests.
3. Refactor: separate validation, routes, repository, and service code into focused modules.

## Salary Insights Slice

1. Red: define tests for country salary min, max, average, and empty-result behavior.
2. Green: implement insight service methods using repository contracts.
3. Refactor: push database-specific aggregation into the Prisma repository.

The tests are intentionally fast and deterministic because they do not require a live database.
