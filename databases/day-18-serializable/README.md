# Day 18 Serializable 

## what it is Serializable

it is a very strict mvcc level or transaction, in this the PostgreSQL SERIALIZABLE permits concurrent execution but ensures that successfully committed transactions behave as if they had executed in some serial order. If a dangerous dependency pattern is detected, PostgreSQL may abort a transaction, and the application must handle the serialization failure.,
think of a transaction with serializable user 1 is actively working on db and 2 more transaction  user 2 , user 3 are there on same db and then if user 1 change something on table and and then any other transaction want to change on  table then the serializable blocks it the transaction have to stay back from those changes if the transaction want to work on the table it have to end and generate a latest snapshot or new transaction 

its like 1 person changes push and all other have to update themself by force to avoid conflict 

and Serializable is not normal as it strictly affect any changes and all the transaction have to restart no this is now, 
it only impact the queries which can cause conflict otherwise it stay in intrupted 


## Queries 

### user 1
```
engineering_lab=# begin isolation level serializable;
BEGIN
engineering_lab=*# select count(*) as doctor_on_call from serializable_demo where on_call = TRUE;
 doctor_on_call 
----------------
              2
(1 row)

engineering_lab=*# update serializable_demo set on_call = FA

engineering_lab=*# update serializable_demo set on_call = FALSE where doctor_id = 1;
UPDATE 1
engineering_lab=*# commit ;
COMMIT
engineering_lab=# 

```

### user 2 

```
engineering_lab=# begin isolation level serializable ;
BEGIN
engineering_lab=*# select count(*) as doctor_on_call from serializable_demo where on_call = TRUE;
 doctor_on_call 
----------------
              2
(1 row)

engineering_lab=*# update serializable_demo set on_call = FALSE where doctor_id = 2;
ERROR:  could not serialize access due to read/write dependencies among transactions
DETAIL:  Reason code: Canceled on identification as a pivot, during write.
HINT:  The transaction might succeed if retried.
engineering_lab=!# select * from serializable_demo;
ERROR:  current transaction is aborted, commands ignored until end of transaction block
engineering_lab=!# rollback;
ROLLBACK

```


## What i learned 
i learned about serialization and actually related it with real world thing like train ticket booking and order booking and how to actually 2 users see a product available and actually this serializable hits back with error without causing 2 order for one item available ( much more things further needed to be added but a small base concept that occurs).


the business invariant are we protecting is like account level don't go below zero or inventory levels.

and transactions are freely make a reasonable decision but when the psql looks as the serial order and creates a cycle then it is a conflict that is totally blocked by the psql 

and the applications should have a proper fall backs and error handling and retries so we can manage failures of serializabble without loosing data 

for update only locks the row we are working on but this is way much furthre from this it detect cycle in serial order and blocks it 

