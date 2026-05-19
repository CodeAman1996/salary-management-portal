# Performance Notes

## 10,000 Employee Seed Script

The seed script reads `first_names.txt` and `last_names.txt` once, generates simple deterministic employee records per batch, and inserts them using Prisma `createMany`.

Default behavior:

```txt
10,000 employees
1,000 employees per batch
10 database insert operations
```

This avoids the common slow pattern of inserting one employee per database round trip. The generation logic is kept in `src/seed/seedData.ts`, so it can be tested without connecting to PostgreSQL.

## Query Performance

The Prisma schema includes indexes for the main filtering and insight paths:

```txt
country
jobTitle
country + jobTitle
department
```

Employee listing uses pagination with a default `pageSize` of 25 and a maximum `pageSize` of 100.
