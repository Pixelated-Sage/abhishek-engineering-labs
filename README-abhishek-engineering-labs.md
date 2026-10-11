# Abhishek's Engineering Lab

A hands-on learning repository documenting my progress toward stronger software engineering and backend fundamentals.

I use this repository to learn by implementing small systems, running experiments, observing how they behave, and writing down what I understand and what I still need to revisit. The focus is on building a real mental model of the code and database—not just getting an application to work.

> This is an evolving learning lab, not a claim that every listed topic is already mastered or production-ready. The READMEs record the work and understanding at the time of each exercise; I revise them as my knowledge improves.

## Current Focus

- Node.js and Express backend fundamentals
- REST API structure and request handling
- PostgreSQL and practical SQL
- Database design, constraints, normalization, joins, and aggregation
- Transactions, pagination, and concurrency
- Reading query plans and exploring database performance

## Repository Structure

```text
.
├── backend/
│   ├── day-01-http-node/
│   ├── day-02-express/
│   ├── day-03-&-04-architecture/
│   ├── day-06-backend/
│   ├── day-09-backend-db-Transaction/
│   ├── day-14-sql-api/
│   └── day-15-pagination/
└── databases/
    ├── day-5-postgresql/
    ├── day-07-postgresql-performance/
    ├── day-08-transactions/
    ├── day-10-constraints/
    ├── day-11-normalization/
    ├── day-12-sql-aggreations/
    ├── day-13-advanced-sql/
    └── day-16-concurrency/
```

Each exercise is kept separate so I can compare approaches and revisit earlier implementations without turning the repository into one large application.

## Learning Log

### Backend

| Exercise | Focus | What it covers |
|---|---|---|
| [Day 1 — HTTP with Node.js](backend/day-01-http-node/) | HTTP basics | A small Node.js HTTP server and request/response handling |
| [Day 2 — Express](backend/day-02-express/) | Routing and middleware | Building a basic API with Express |
| [Days 3–4 — Backend architecture](backend/day-03-&-04-architecture/) | Separation of concerns | Routes, controllers, services, database access, and error handling |
| [Day 6 — Backend layers and repository](backend/day-06-backend/) | Database-backed APIs | Separating request handling, business logic, and data access |
| [Day 9 — Backend transactions](backend/day-09-backend-db-Transaction/) | Transaction flow | Implementing a transfer workflow with transaction handling and rollback |
| [Day 14 — SQL + backend API](backend/day-14-sql-api/) | SQL-powered endpoints | Fetching records, filtering with a query parameter, joins, grouping, and aggregation |
| [Day 15 — Pagination](backend/day-15-pagination/) | Bounded result sets | `LIMIT`, `OFFSET`, ordering, and page/limit validation |

### Databases and SQL

| Exercise | Focus | What it covers |
|---|---|---|
| [Day 5 — PostgreSQL + SQL](databases/day-5-postgresql/) | Relational foundations | Tables, CRUD, relationships, constraints, joins, and connecting a backend to PostgreSQL |
| [Day 7 — PostgreSQL performance](databases/day-07-postgresql-performance/) | Query plans and indexes | `EXPLAIN ANALYZE`, sequential scans, index scans, and performance trade-offs |
| [Day 8 — Transactions](databases/day-08-transactions/) | ACID and transaction control | `BEGIN`, `COMMIT`, `ROLLBACK`, and `SAVEPOINT` |
| [Day 10 — Constraints](databases/day-10-constraints/) | Data integrity | Primary keys, foreign keys, `UNIQUE`, `NOT NULL`, `CHECK`, and delete behavior |
| [Day 11 — Normalization](databases/day-11-normalization/) | Relational design | Update/insert/delete anomalies and separating students, courses, and enrollments |
| [Day 12 — SQL aggregation](databases/day-12-sql-aggreations/) | Combining and summarizing data | Joins, `GROUP BY`, `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `WHERE`, and `HAVING` |
| [Day 13 — Advanced SQL](databases/day-13-advanced-sql/) | Query patterns | Subqueries, `IN`, `EXISTS`, `CASE`, and `COALESCE` |
| [Day 16 — PostgreSQL concurrency](databases/day-16-concurrency/) | Concurrent access | Multiple SQL sessions, `FOR UPDATE`, row locks, and waiting for a transaction to finish |

The day numbers reflect the learning log and do not imply that every number has a folder in each section.

## Tech Used

- **Languages:** JavaScript, SQL
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Tools:** `psql`, Git, GitHub, command-line experiments

The stack will expand as I build and verify more topics. A technology appearing in an experiment does not by itself mean I consider myself proficient in it.

## How to Explore or Run an Exercise

1. Open the exercise folder you want to inspect.
2. Read its `README.md` first (some older folders may use a different filename).
3. Review the SQL files and/or source code.
4. For a Node.js exercise, open a terminal in that folder, inspect its `package.json`, and install that exercise's dependencies with `npm install` if needed.
5. For a database exercise, use the schema and query files provided in that folder and run them against a local PostgreSQL database as described in the exercise notes.

These folders are independent exercises, not a single root-level Node application. Dependencies and setup can differ between them. Some exercises are local experiments and may need configuration changes before running on another machine. Never commit real credentials or private environment values.

## How I Learn

For each topic, the aim is to follow this loop:

1. Understand the problem and the underlying concept.
2. Implement a small version myself.
3. Run it and inspect the result.
4. Test edge cases and failure behavior.
5. Write down the reasoning, surprises, and remaining questions.
6. Commit the code and notes so progress is visible and reviewable.

AI tools may be part of my workflow, but the learning goal is to be able to explain the implementation, make changes, and debug it independently. I do not treat generated code or a successful run as proof that I understand a topic.

## What Comes Next

The next improvements will follow the learning sprint rather than a fixed claim of expertise:

- Continue API work, including pagination and authentication topics.
- Validate inputs and handle errors consistently.
- Write more repeatable tests for success and failure cases.
- Deepen PostgreSQL understanding through query plans, indexing, transactions, and concurrency experiments.
- Revisit earlier code to correct bugs, improve consistency, and document evidence.

## Feedback

This repository is a record of an active learning process. Suggestions, corrections, and questions that help strengthen the code or the reasoning behind it are welcome.
