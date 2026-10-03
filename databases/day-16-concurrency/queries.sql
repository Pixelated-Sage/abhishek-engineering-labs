BEGIN;

SELECT *
FROM accounts
WHERE id = 'A-01'
FOR UPDATE;


BEGIN;

UPDATE accounts
SET balance = balance + 100
WHERE id = 'A-01';