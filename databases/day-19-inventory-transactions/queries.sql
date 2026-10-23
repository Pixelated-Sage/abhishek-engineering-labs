WITH reserved AS (
    UPDATE inventory
    SET stock = stock - 3
    WHERE pid = 'P05'
      AND stock >= 3
    RETURNING pid
)
INSERT INTO transactions (tid, pid, quantity)
SELECT 'T14', pid, 3
FROM reserved
RETURNING tid, pid, quantity, created_at;