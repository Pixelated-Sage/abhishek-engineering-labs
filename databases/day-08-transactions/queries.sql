-- Stop executing if any error happens (highly recommended!)
\set ON_ERROR_STOP on

-- 1. Start the transaction block (Remove the "--"!)
BEGIN;

-- 2. Create your checkpoint savepoint
SAVEPOINT sp1;

-- 3. Run your delete command
DELETE FROM students WHERE id = 'S00002';

-- 4. Rollback to the savepoint to undo the deletion!
ROLLBACK TO SAVEPOINT sp1;

-- 5. Safely close the transaction sandbox
COMMIT;
