
-- \set ON_ERROR_STOP on

-- BEGIN;

-- SAVEPOINT sp1;

-- DELETE FROM students WHERE id = 'S00002';

-- ROLLBACK TO SAVEPOINT sp1;

-- COMMIT;

