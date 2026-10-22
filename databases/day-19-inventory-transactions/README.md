# Day 19 — Inventory Transactions

Today's objective is to make an inventory system with stock management within constraints. Let's see what comes up next.

## 1. Inventory Table

As we build it, we have an `inventory` table that looks like this:

```text
 pid | pname | stock | price
-----+-------+-------+--------
 P02 | chai  |     7 |  30.32
 P03 | haldi |    13 |  12.32
 P04 | munch |    20 |   5.00
 P05 | dahi  |    12 |  30.00
 P06 | ataa  |     4 | 170.00
 P01 | dudh  |    12 |  35.32
(6 rows)
```



```
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
```


## 2. Transaction Table

I also made a transaction table, which looks like this:

```text
 tid | pid | quantity |            created_at
-----+-----+----------+----------------------------------
 T01 | P01 |        3 | 2026-10-20 03:33:12.508305+05:30
```
```
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

```


### Internal Constraints

I made these two tables to actually work with. They have internal constraints I have set:

- Check of `quantity > 0` and `stock >= 0`
- Set `pid` and `tid` as primary keys
- `pname` to `NOT NULL`
- `price` to decimal value
- Timestamp to datetime with timezone

## 3. Our Task

- Deduct some products and mark the transaction.

But cases are there:

- If stocks are 0, then no transaction should happen.
- Concurrency test if two users hit for the same item and stocks are limited.

## 4. My Actual Understanding and Working Plan

First query hits the inventory to check if the stocks are available or not.

If not:

- Nothing happens; no transaction gets registered.

If yes:

- The transaction gets a record of how much quantity got out from which product (`pid`).

All this is going to happen inside a transaction of PSQL (`BEGIN`, `ROLLBACK`, `COMMIT`) to actually work with rows and isolate rows inside a transaction so no other user intercepts between our procedure.

## 5. Using the `WITH` Common Table Expression (CTE)

To execute this for the first time, I tried the `WITH` Common Table Expression (CTE) command.

This is a command to extract result for the sql statement So what we do is:

- `WITH` creates a variable.
- Then the query runs to change the stocks for a particular row, and the `WHERE` clause does the task.
- If stocks are present, like `stock >= 3`, then it updates; otherwise, nothing changes.

As the returning value is `pid`, we have to store it in the variable we made with the `WITH` command.

In this case, we use the variable's `pid` to create a new transaction.

- If there are 0 changes, then the output of `WITH` is 0 rows and nothing is in the returning `pid`. Then no updates happen.
- If there is a `pid`, then the transaction hits the table and we get a new row for the transaction.

## 6. Concurrency

In the case of multiple users working on a table, and we need proper isolation for a single stock change, we use a transaction. For a particular row, we use row locking via `FOR UPDATE`, and then no other transaction can work on that row until our transaction is done.

### Session 1

```sql
engineering_lab=!# rollback;
ROLLBACK

engineering_lab=# begin;
BEGIN

engineering_lab=*# select * from inventory where pid = 'P01' for update;

 pid | pname | stock | price
-----+-------+-------+-------
 P01 | dudh  |    12 | 35.32
(1 row)
```

### Session 2

```sql
engineering_lab=# begin;
BEGIN

engineering_lab=*# select * from inventory;

 pid | pname | stock | price
-----+-------+-------+--------
 P02 | chai  |     7 |  30.32
 P03 | haldi |    13 |  12.32
 P04 | munch |    20 |   5.00
 P05 | dahi  |    12 |  30.00
 P06 | ataa  |     4 | 170.00
 P01 | dudh  |    12 |  35.32
(6 rows)

engineering_lab=*# update inventory set stock = stock-2 where pid = 'P01';
...
```

It is not doing any updates; it stays as it is.

## 7. Reservation in Action

Here, let's look at it actually working in real life.

```sql
engineering_lab=# begin;
BEGIN

engineering_lab=*# select * from inventory where pid = 'P01' for update;

 pid | pname | stock | price
-----+-------+-------+-------
 P01 | dudh  |    10 | 35.32
(1 row)

engineering_lab=*# with reserved as (
    update inventory
    set stock = stock - 3
    where pid = 'P01' and stock >= 3
    returning pid
)
insert into transactions (tid, pid, quantity)
select 'T06', pid, 3
from reserved
returning tid, pid, quantity, created_at;

 tid | pid | quantity |            created_at
-----+-----+----------+----------------------------------
 T06 | P01 |        3 | 2026-10-22 15:13:33.011456+05:30
(1 row)

INSERT 0 1

engineering_lab=*# select * from inventory;

 pid | pname | stock | price
-----+-------+-------+--------
 P02 | chai  |     7 |  30.32
 P03 | haldi |    13 |  12.32
 P04 | munch |    20 |   5.00
 P05 | dahi  |    12 |  30.00
 P06 | ataa  |     4 | 170.00
 P01 | dudh  |     7 |  35.32
(6 rows)

engineering_lab=*# commit;
COMMIT
```

## 8. Checking Whether Stocks Are Gone

Let's see if the stocks are gone.

```sql
engineering_lab=# select * from inventory;

 pid | pname | stock | price
-----+-------+-------+--------
 P02 | chai  |     7 |  30.32
 P03 | haldi |    13 |  12.32
 P04 | munch |    20 |   5.00
 P05 | dahi  |    12 |  30.00
 P06 | ataa  |     4 | 170.00
 P01 | dudh  |     4 |  35.32
(6 rows)
```

Now I tried to reserve 5 units when only 4 were available.

```sql
engineering_lab=# begin;
BEGIN

engineering_lab=*# select * from inventory where pid = 'P01' for update;

 pid | pname | stock | price
-----+-------+-------+-------
 P01 | dudh  |     4 | 35.32
(1 row)

engineering_lab=*# with reserved as (
    update inventory
    set stock = stock - 5
    where pid = 'P01' and stock >= 5
    returning pid
)
insert into transactions (tid, pid, quantity)
select 'T07', pid, 5
from reserved
returning tid, pid, quantity, created_at;

 tid | pid | quantity | created_at
-----+-----+----------+------------
(0 rows)

INSERT 0 0
```

## 9. Concurrency Test — Two Users Competing for Limited Stock

Now let's see what happens if two users compete for a single stock.

### Session 1

```sql
engineering_lab=# begin;
BEGIN

engineering_lab=*# select * from inventory where pid = 'P01' for update;

 pid | pname | stock | price
-----+-------+-------+-------
 P01 | dudh  |     1 | 35.32
(1 row)

engineering_lab=*# with reserved as (
    update inventory
    set stock = stock - 3
    where pid = 'P01' and stock >= 3
    returning pid
)
insert into transactions (tid, pid, quantity)
select 'T07', pid, 3
from reserved
returning tid, pid, quantity, created_at;

 tid | pid | quantity | created_at
-----+-----+----------+------------
(0 rows)

INSERT 0 0

engineering_lab=*# with reserved as (
    update inventory
    set stock = stock - 1
    where pid = 'P01' and stock >= 1
    returning pid
)
insert into transactions (tid, pid, quantity)
select 'T08', pid, 1
from reserved
returning tid, pid, quantity, created_at;

 tid | pid | quantity |            created_at
-----+-----+----------+----------------------------------
 T08 | P01 |        1 | 2026-10-22 15:19:28.568673+05:30
(1 row)

INSERT 0 1

engineering_lab=*# commit;
COMMIT

```

### Session 2

```sql
engineering_lab=# begin;
BEGIN

engineering_lab=*# with reserved as (
    update inventory
    set stock = stock - 3
    where pid = 'P01' and stock >= 3
    returning pid
)
insert into transactions (tid, pid, quantity)
select 'T07', pid, 3
from reserved
returning tid, pid, quantity, created_at;

 tid | pid | quantity | created_at
-----+-----+----------+------------
(0 rows)

INSERT 0 0

engineering_lab=*# with reserved as (
    update inventory
    set stock = stock - 1
    where pid = 'P01' and stock >= 1
    returning pid
)
insert into transactions (tid, pid, quantity)
select 'T08', pid, 1
from reserved
returning tid, pid, quantity, created_at;
```

It stayed here until Session 1 committed, and the output is below.

```sql
engineering_lab=*# with reserved as (
    update inventory
    set stock = stock - 1
    where pid = 'P01' and stock >= 1
    returning pid
)
insert into transactions (tid, pid, quantity)
select 'T08', pid, 1
from reserved
returning tid, pid, quantity, created_at;

 tid | pid | quantity | created_at
-----+-----+----------+------------
(0 rows)

INSERT 0 0

engineering_lab=*# commit;
COMMIT

```



### after all this 

```

engineering_lab=# select * from inventory;
 pid | pname | stock | price  
-----+-------+-------+--------
 P02 | chai  |     7 |  30.32
 P03 | haldi |    13 |  12.32
 P04 | munch |    20 |   5.00
 P05 | dahi  |    12 |  30.00
 P06 | ataa  |     4 | 170.00
 P01 | dudh  |     0 |  35.32
(6 rows)

engineering_lab=# select * from transactions ;
 tid | pid | quantity |            created_at            
-----+-----+----------+----------------------------------
 T01 | P01 |        3 | 2026-10-20 03:33:12.508305+05:30
 T06 | P01 |        3 | 2026-10-22 15:13:33.011456+05:30
 T07 | P01 |        3 | 2026-10-22 15:17:28.514306+05:30
 T08 | P01 |        1 | 2026-10-22 15:19:28.568673+05:30
(4 rows)

engineering_lab=# 
```