BEGIN;

UPDATE students
SET age = 39
WHERE id = 'S000';

COMMIT;