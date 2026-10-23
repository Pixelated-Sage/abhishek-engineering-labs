## day 20 database consolidation

lets try to revise some more commands 



#### Data Aggregation: Join inventory with transactions to calculate and display the total quantity sold for each product name.

```
 tid | pid | quantity |            created_at            
-----+-----+----------+----------------------------------
 T01 | P01 |        3 | 2026-10-20 03:33:12.508305+05:30
 T06 | P01 |        3 | 2026-10-22 15:13:33.011456+05:30
 T07 | P01 |        3 | 2026-10-22 15:17:28.514306+05:30
 T08 | P01 |        1 | 2026-10-22 15:19:28.568673+05:30
 T02 | P02 |        2 | 2026-10-23 10:19:00.523441+05:30
 T03 | P03 |        3 | 2026-10-23 10:19:39.37941+05:30
 T04 | P06 |        4 | 2026-10-23 10:20:05.452812+05:30
 T05 | P04 |        1 | 2026-10-23 10:20:32.965395+05:30
 T09 | P04 |        3 | 2026-10-23 10:20:56.570314+05:30
 T10 | P04 |        3 | 2026-10-23 10:21:03.786738+05:30
 T11 | P04 |        3 | 2026-10-23 10:21:08.731042+05:30
 T12 | P05 |        3 | 2026-10-23 10:21:25.654074+05:30
 T13 | P05 |        3 | 2026-10-23 10:21:30.803352+05:30
 T14 | P05 |        3 | 2026-10-23 10:21:36.601116+05:30
(14 rows)


engineering_lab=# select i.pid as product_id ,i.pname as product_name, sum(t.quantity) as Product_sold from inventory i inner join transactions t on i.pid = t.pid group by i.pid , i.pname ;
 product_id | product_name | product_sold 
------------+--------------+--------------
 P01        | dudh         |           10
 P03        | haldi        |            3
 P06        | ataa         |            4
 P02        | chai         |            2
 P04        | munch        |           10
 P05        | dahi         |            9
(6 rows)
```


#### Constraints: Prove that negative stock and zero/negative transaction quantities are rejected.

##### stocks

```
engineering_lab=# \d inventory;
                    Table "public.inventory"
 Column |         Type          | Collation | Nullable | Default 
--------+-----------------------+-----------+----------+---------
 pid    | character varying(10) |           | not null | 
 pname  | character varying(30) |           | not null | 
 stock  | integer               |           | not null | 
 price  | numeric(10,2)         |           | not null | 
Indexes:
    "inventory_pkey" PRIMARY KEY, btree (pid)
Check constraints:
    "inventory_price_check" CHECK (price >= 0::numeric)
    "inventory_stock_check" CHECK (stock >= 0)
Referenced by:
    TABLE "transactions" CONSTRAINT "transactions_pid_fkey" FOREIGN KEY (pid) REFERENCES inventory(pid)



engineering_lab=# insert into inventory (pid , pname, stock, price) values ('P07','chini',-1, 35.89);
ERROR:  new row for relation "inventory" violates check constraint "inventory_stock_check"
DETAIL:  Failing row contains (P07, chini, -1, 35.89).
engineering_lab=# 

```

##### quantity

```
engineering_lab=# \d transactions;
                      Table "public.transactions"
   Column   |           Type           | Collation | Nullable | Default 
------------+--------------------------+-----------+----------+---------
 tid        | character varying(10)    |           | not null | 
 pid        | character varying(10)    |           |          | 
 quantity   | integer                  |           | not null | 
 created_at | timestamp with time zone |           |          | now()
Indexes:
    "transactions_pkey" PRIMARY KEY, btree (tid)
Check constraints:
    "transactions_quantity_check" CHECK (quantity > 0)
Foreign-key constraints:
    "transactions_pid_fkey" FOREIGN KEY (pid) REFERENCES inventory(pid)


engineering_lab=# insert into transactions (tid , pid, quantity) values ('T15','P05',0);ERROR:  new row for relation "transactions" violates check constraint "transactions_quantity_check"
DETAIL:  Failing row contains (T15, P05, 0, 2026-10-23 10:31:20.638946+05:30).
engineering_lab=# 

engineering_lab=# insert into transactions (tid , pid, quantity) values ('T15','P05',-1);
ERROR:  new row for relation "transactions" violates check constraint "transactions_quantity_check"
DETAIL:  Failing row contains (T15, P05, -1, 2026-10-23 11:18:29.306011+05:30).
engineering_lab=# 



```

#### Transactions: Reserve stock and record the transaction atomically.
```
engineering_lab=# begin;
BEGIN
engineering_lab=*# select * from inventory where pid = 'P05' for update;
 pid | pname | stock | price 
-----+-------+-------+-------
 P05 | dahi  |     3 | 30.00
(1 row)

engineering_lab=*# WITH reserved AS (
    UPDATE inventory
    SET stock = stock - 2
    WHERE pid = 'P05'
      AND stock >= 2
    RETURNING pid
)
INSERT INTO transactions (tid, pid, quantity)
SELECT 'T15', pid, 2
FROM reserved
RETURNING tid, pid, quantity, created_at;
 tid | pid | quantity |            created_at            
-----+-----+----------+----------------------------------
 T15 | P05 |        2 | 2026-10-23 10:32:59.017205+05:30
(1 row)

INSERT 0 1
engineering_lab=*# select * from inventory;
 pid | pname | stock | price  
-----+-------+-------+--------
 P01 | dudh  |     0 |  35.32
 P02 | chai  |     5 |  30.32
 P03 | haldi |    10 |  12.32
 P06 | ataa  |     0 | 170.00
 P04 | munch |    10 |   5.00
 P05 | dahi  |     1 |  30.00
(6 rows)

engineering_lab=*# commit;
COMMIT
engineering_lab=# 
```

#### Rollback: Prove that a failed operation does not leave partial changes.

```
engineering_lab=# begin;
BEGIN
engineering_lab=*# select * from inventory where pid = 'P03' for update;
 pid | pname | stock | price 
-----+-------+-------+-------
 P03 | haldi |    10 | 12.32
(1 row)

engineering_lab=*# WITH reserved AS (
    UPDATE inventory
    SET stock = stock - 2
    WHERE pid = 'P03'
      AND stock >= 2
    RETURNING pid
)
INSERT INTO transactions (tid, pid, quantity)
SELECT 'T16', pid, 2
FROM reserved
RETURNING tid, pid, quantity, created_at;
 tid | pid | quantity |            created_at            
-----+-----+----------+----------------------------------
 T16 | P03 |        2 | 2026-10-23 10:34:51.566631+05:30
(1 row)

INSERT 0 1
engineering_lab=*# select * from inventory ;
 pid | pname | stock | price  
-----+-------+-------+--------
 P01 | dudh  |     0 |  35.32
 P02 | chai  |     5 |  30.32
 P06 | ataa  |     0 | 170.00
 P04 | munch |    10 |   5.00
 P05 | dahi  |     1 |  30.00
 P03 | haldi |     8 |  12.32
(6 rows)

engineering_lab=*# error;
ERROR:  syntax error at or near "error"
LINE 1: error;
        ^
engineering_lab=!# select * from inventory ;
ERROR:  current transaction is aborted, commands ignored until end of transaction block
engineering_lab=!# rollback;
ROLLBACK
engineering_lab=# select * from inventory;
 pid | pname | stock | price  
-----+-------+-------+--------
 P01 | dudh  |     0 |  35.32
 P02 | chai  |     5 |  30.32
 P03 | haldi |    10 |  12.32
 P06 | ataa  |     0 | 170.00
 P04 | munch |    10 |   5.00
 P05 | dahi  |     1 |  30.00
(6 rows)

engineering_lab=# 
```


#### Concurrency: Explain why two users cannot successfully reserve more stock than is available.

##### session 1 
```
engineering_lab=# begin ;
BEGIN
engineering_lab=*# select * from inventory where pid = 'P05' for update;
 pid | pname | stock | price 
-----+-------+-------+-------
 P05 | dahi  |     1 | 30.00
(1 row)

engineering_lab=*# WITH reserved AS (
    UPDATE inventory
    SET stock = stock - 1
    WHERE pid = 'P05'
      AND stock >= 1
    RETURNING pid
)
INSERT INTO transactions (tid, pid, quantity)
SELECT 'T20', pid, 1
FROM reserved
RETURNING tid, pid, quantity, created_at;
 tid | pid | quantity |            created_at            
-----+-----+----------+----------------------------------
 T20 | P05 |        1 | 2026-10-23 11:16:13.731256+05:30
(1 row)

INSERT 0 1
engineering_lab=*# select * from inventory;
 pid | pname | stock | price  
-----+-------+-------+--------
 P01 | dudh  |     0 |  35.32
 P02 | chai  |     5 |  30.32
 P06 | ataa  |     0 | 170.00
 P04 | munch |    10 |   5.00
 P03 | haldi |     6 |  12.32
 P05 | dahi  |     0 |  30.00
(6 rows)

engineering_lab=*# commit ;
COMMIT

```

##### session 2
```
engineering_lab=# begin;
BEGIN
engineering_lab=*# with reserved as (
update inventory set stock = stock -1 where pid = 'P05' and stock >= 1 returning pid)
insert into transactions (tid, pid , quantity) select 'T20' ,pid, 1 from reserved returning tid , pid , quantity , created_at; 
 tid | pid | quantity | created_at 
-----+-----+----------+------------
(0 rows)

INSERT 0 0
engineering_lab=*# select * from inventory ;
 pid | pname | stock | price  
-----+-------+-------+--------
 P01 | dudh  |     0 |  35.32
 P02 | chai  |     5 |  30.32
 P06 | ataa  |     0 | 170.00
 P04 | munch |    10 |   5.00
 P03 | haldi |     6 |  12.32
 P05 | dahi  |     0 |  30.00
(6 rows)

engineering_lab=*# rollback;
ROLLBACK

```


#### Performance: Run EXPLAIN ANALYZE on one meaningful query and explain the plan.


```
engineering_lab=# begin ;
BEGIN
engineering_lab=# explain analyze update inventory set stock = 14 where pid = 'P03';
                                                             QUERY PLAN                                                             
------------------------------------------------------------------------------------------------------------------------------------
 Update on inventory  (cost=0.15..8.17 rows=0 width=0) (actual time=0.062..0.063 rows=0.00 loops=1)
   Buffers: shared hit=5
   ->  Index Scan using inventory_pkey on inventory  (cost=0.15..8.17 rows=1 width=10) (actual time=0.019..0.020 rows=1.00 loops=1)
         Index Cond: ((pid)::text = 'P03'::text)
         Index Searches: 1
         Buffers: shared hit=2
 Planning Time: 0.054 ms
 Execution Time: 0.079 ms
(8 rows)

engineering_lab=*# commit ;
COMMIT

```


so this is the whole explanation of psql engine worked behind the scene and executed my single query

lets breakdown it one by one 

- cost is the estimate guesses by psql 
- actual time is the acurate data of execution
    - rows are the count of row found or modified in a single loop 
    - loops is the loops formed
    - width is the estimate data size per row in bytes
- buffers is the total memory pages touched to lookup and physical update
- index scan is the techniques instead of doing row by row look ups, psql did index scan directly jump to the index we are finding to update via primary key 
- index cond: - the condition we applied
- index searches - the count of how many time the psql have to search into the tree to find the index and its 1 which is very fast.
- planning time - how much time it took to plan 
- exection time - how much time it took to make changes.


**another query we can look for -**


```
engineering_lab=# begin ;
BEGIN
engineering_lab=# explain analyze WITH reserved AS (
    UPDATE inventory
    SET stock = stock - 2
    WHERE pid = 'P03'
      AND stock >= 2
    RETURNING pid
)
INSERT INTO transactions (tid, pid, quantity)
SELECT 'T19', pid, 2
FROM reserved
RETURNING tid, pid, quantity, created_at;
                                                                 QUERY PLAN                                                                 
--------------------------------------------------------------------------------------------------------------------------------------------
 Insert on transactions  (cost=8.17..8.19 rows=1 width=92) (actual time=0.078..0.081 rows=1.00 loops=1)
   Buffers: shared hit=7
   CTE reserved
     ->  Update on inventory  (cost=0.15..8.17 rows=1 width=10) (actual time=0.057..0.059 rows=1.00 loops=1)
           Buffers: shared hit=5
           ->  Index Scan using inventory_pkey on inventory  (cost=0.15..8.17 rows=1 width=10) (actual time=0.022..0.024 rows=1.00 loops=1)
                 Index Cond: ((pid)::text = 'P03'::text)
                 Filter: (stock >= 2)
                 Index Searches: 1
                 Buffers: shared hit=2
   ->  CTE Scan on reserved  (cost=0.00..0.02 rows=1 width=92) (actual time=0.060..0.062 rows=1.00 loops=1)
         Storage: Memory  Maximum Storage: 17kB
         Buffers: shared hit=5
 Planning Time: 0.104 ms
 Trigger for constraint transactions_pid_fkey on transactions: time=0.027 calls=1
 Execution Time: 0.132 ms
(16 rows)

engineering_lab=*# commit ;
COMMIT

```