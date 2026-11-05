# DAY 24 — PostgreSQL Integration Tests and Schema Reproducibility

## Objective

Verify that PostgreSQL independently enforces database constraints, even when application-level validation is bypassed.

I created a separate database, `engineering_lab_schema_check`, and used the `pg` library with Vitest to execute SQL queries directly against PostgreSQL.

## 1. Test Environment

- **Database:** `engineering_lab_schema_check`
- **Database client:** Node.js `pg` library
- **Test framework:** Vitest
- **Connection:** PostgreSQL connection pool
- **Test file:** `tests/integration/database.constraint.test.js`

The tests connect directly to PostgreSQL instead of sending HTTP requests through Express.

## 2. Database Constraints Tested

### Users table

| Constraint | Test performed | Expected behavior |
|---|---|---|
| UNIQUE | Insert two users with the same email | Reject duplicate email |
| CHECK | Insert a user with age below 18 | Reject invalid age |
| Valid insert | Insert a user with valid data | Allow insertion |

### Courses table

| Constraint | Test performed | Expected behavior |
|---|---|---|
| NOT NULL | Insert a course with `NULL` name | Reject insertion |
| PRIMARY KEY | Insert two courses with the same ID | Reject duplicate ID |

### Enrollments table

| Constraint | Test performed | Expected behavior |
|---|---|---|
| FOREIGN KEY | Insert enrollment with nonexistent user ID | Reject insertion |
| FOREIGN KEY | Insert enrollment with an existing user ID | Allow insertion |

## 3. Transaction-Based Test Isolation

I used PostgreSQL transactions to prevent test operations from permanently changing the database.

The lifecycle for each test:

1. `beforeEach()` establishes a database connection.
2. The current database is checked to ensure the test is connected to `engineering_lab_schema_check`.
3. A transaction begins using `BEGIN`.
4. Existing test data is cleared using `TRUNCATE`.
5. The test executes its SQL operations.
6. `afterEach()` executes `ROLLBACK`.
7. The database client is released back to the pool.

This means changes made during a test are rolled back after that test finishes, whether its assertions pass or fail.

I also used `afterAll()` to close the connection pool after the test suite finishes.

## 4. Test Factory and Database Operations

For these tests, I used direct SQL statements rather than sending requests through the application.

I used a PostgreSQL client acquired through:

```js
client = await pool.connect();
```

This allowed me to execute `BEGIN`, queries, and `ROLLBACK` on the same database connection.

**Important:** A transaction belongs to its database connection. Using the same client throughout a test ensures all operations participate in the same transaction.

## 5. PostgreSQL Error Codes Observed

| Error code | Meaning | Tested against |
|---|---|---|
| `23505` | Unique constraint violation | Users email, Courses primary key |
| `23514` | Check constraint violation | Users age |
| `23502` | NOT NULL constraint violation | Courses name |
| `23503` | Foreign key violation | Enrollments user ID |

These error codes help identify the specific database constraint that rejected an operation.

## 6. Test Results

**Command executed:**

```bash
npx vitest run tests/integration/database.constraint.test.js
```

<escape>**Observed output:**</escape>

```text
✓ tests/integration/database.constraint.test.js (7 tests)

✓ users Table constraints checks (3)
  ✓ Insert a user with a valid email
  ✓ Insert a user with a duplicate email
  ✓ Insert age smaller than 18

✓ courses Table constraints Checks (2)
  ✓ NOT NULL constraint
  ✓ Primary key constraint

✓ Enrollment Table constraints Checks (2)
  ✓ Non-existent user ID rejected
  ✓ Existing user ID accepted

Test Files  1 passed (1)
Tests       7 passed (7)
```

**Result:** All 7 database constraint tests passed in the observed run.

## 7. What I Learned

- API validation and database constraints have different responsibilities.
- Zod validates incoming application data, while PostgreSQL protects stored data.
- Database constraints are necessary even when application-level validation exists.
- PostgreSQL error codes help identify why an SQL operation failed.
- Transactions can isolate test operations and allow changes to be rolled back.
- A database client must be released after use.
- A separate test database protects development data from test operations.

## 8. Final Understanding

Application-level validation improves the API's response to invalid input, but it cannot replace database constraints.

For example, two requests could attempt to register the same email at nearly the same time. Application-level duplicate checks alone cannot guarantee uniqueness under concurrency.

A PostgreSQL `UNIQUE` constraint provides that guarantee at the database level.

**The database is the final integrity boundary for stored data.**

## Completion Checklist

- [x] Created a separate schema-check database.
- [x] Connected to PostgreSQL using `pg`.
- [x] Tested UNIQUE constraints.
- [x] Tested CHECK constraints.
- [x] Tested NOT NULL constraints.
- [x] Tested PRIMARY KEY constraints.
- [x] Tested FOREIGN KEY constraints.
- [x] Implemented transaction-based test isolation.
- [x] Implemented database cleanup and pool shutdown.
- [x] Ran all 7 tests successfully.