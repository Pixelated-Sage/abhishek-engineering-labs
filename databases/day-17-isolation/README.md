# Day 17 — Transaction Isolation

## READ COMMITTED

this is the default for the postgre sql 
in a transaction the snapshot gets updated at every queries so the snapshot don't miss any commit and data stay live from the major db.

## REPEATABLE READ
this is the another isolation level of psql 
in this transaction locks the snapshot and keep its as it is even if in the actual db the there are changes or multiple commit occurs the isolation level stay as it is.

## WITH READ COMMITED

### user 1
engineering_lab=# begin;
BEGIN
engineering_lab=*# select * from students where id = 'S000';
  id  |   name   |     email      | age 
------+----------+----------------+-----
 S000 | abhishek | abhi@gmail.com |  20
(1 row)

engineering_lab=*# select * from students where id = 'S000';
  id  |   name   |     email      | age 
------+----------+----------------+-----
 S000 | abhishek | abhi@gmail.com |  30
(1 row)

engineering_lab=*# rollback;
ROLLBACK


### user 2
engineering_lab=# begin;
BEGIN
engineering_lab=*# update students set age = 30 where id = 'S000';
UPDATE 1
engineering_lab=*# commit ;
COMMIT



## WITH REPEATABLE READ

### user 1
engineering_lab=# begin isolation level repeatable read;
BEGIN
engineering_lab=*# select * from students where id = 'S000';
  id  |   name   |     email      | age 
------+----------+----------------+-----
 S000 | abhishek | abhi@gmail.com |  30
(1 row)

engineering_lab=*# select * from students where id = 'S000';
  id  |   name   |     email      | age 
------+----------+----------------+-----
 S000 | abhishek | abhi@gmail.com |  30
(1 row)

engineering_lab=*# rollback;
ROLLBACK


### user 2

engineering_lab=# begin;
BEGIN
engineering_lab=*# update students set age = 39 where id = 'S000';
UPDATE 1
engineering_lab=*# commit ;
COMMIT


## What I Observed
It actually show itself how it works in read commited - as soon as user 2 commited changes it got reflected in the user 1 output
but 
in repeatable read - same changes done by user 2 but the data output in user 1 stays same as it is


## Non-repeatable Read
no repeatable read is when i am in transaction and working on a row 7 and some other person update the row 7 and output got changed and my work got intrupted 

## MVCC Connection
MVCC is the transaction manager that keeps the rule reader and writer work simultaneously without blocking each other 

### analomies 
- non repeatable 
- phantom row

## What I Learned

i learned about how mvcc actually handle the isolation and actually transactions work with the snapshots and other transactions 