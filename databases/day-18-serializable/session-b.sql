BEGIN ISOLATION LEVEL SERIALIZABLE;

SELECT COUNT(*) AS doctors_on_call
FROM serializable_demo
WHERE on_call = TRUE;

UPDATE serializable_demo
SET on_call = FALSE
WHERE doctor_id = 2;

COMMIT;
