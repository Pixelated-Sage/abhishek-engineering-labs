select i.pid as product_id ,i.pname as product_name, sum(t.quantity) as Product_sold from inventory i 
inner join transactions t on i.pid = t.pid 
group by i.pid , i.pname ;



-- Constraints: Prove that negative stock and zero/negative transaction quantities are rejected.

-- \d inventory;

-- insert into inventory (pid , pname, stock, price) values ('P07','chini',-1, 35.89);

-- insert into transactions (tid , pid, quantity) values ('T15','P05',0);



-- Transactions: Reserve stock and record the transaction atomically.
-- begin;

-- select * from inventory where pid = 'P05' for update;

--  WITH reserved AS (
--     UPDATE inventory
--     SET stock = stock - 2
--     WHERE pid = 'P05'
--       AND stock >= 2
--     RETURNING pid
-- )
-- INSERT INTO transactions (tid, pid, quantity)
-- SELECT 'T15', pid, 2
-- FROM reserved
-- RETURNING tid, pid, quantity, created_at;

-- select * from inventory;

-- commit;


-- Rollback: Prove that a failed operation does not leave partial changes.



-- begin;
-- select * from inventory where pid = 'P03' for update;
-- WITH reserved AS (
--     UPDATE inventory
--     SET stock = stock - 2
--     WHERE pid = 'P03'
--       AND stock >= 2
--     RETURNING pid
-- )
-- INSERT INTO transactions (tid, pid, quantity)
-- SELECT 'T16', pid, 2
-- FROM reserved
-- RETURNING tid, pid, quantity, created_at;
-- select * from inventory ;
-- error;
--  select * from inventory ;
--  rollback;
--  select * from inventory;



-- Concurrency: Explain why two users cannot successfully reserve more stock than is available.

--  in README.md


-- Performance: Run EXPLAIN ANALYZE on one meaningful query and explain the plan.

explain analyze update inventory set stock = 14 where pid = 'P03';