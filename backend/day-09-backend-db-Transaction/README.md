# Day 9 — Node.js PostgreSQL Transactions

## Problem 
so as the ACID transactions in psql we can work in a ghost environment and then 
work on db but in case of error or undo things we use rollback 
but in node js the project are directly hitting db with a single pool and one command one pool if i shift directly to transaction without classes it willl be like begin then i go to next command that hits the db without caring about the first begin and those changes are parmanent what if while developing a cleaned up the db or eerror happen continously db will face the changes and majorly data in db is not safe there any time anything can happen 
## Transaction Flow

BEGIN
↓
Debit
↓
Credit
↓
COMMIT

## Failure Flow

BEGIN
↓
Debit
↓
Credit fails
↓
ROLLBACK

## Why One Client Is Required
in this time i learned about classes in js and then used instance of funtions 
like i created classes for service, controller , repository and in router i 
initiated the classes with a single pool and single instance of the pool so i can begin a transaction in service and start working inside that transacction 


## Successful Transfer
yes routes to controller handling the instance then service handle the transacction and logic of transfer money and repository handle the actual transfers
## Failed Transfer
in case of error in repo with any function if credit or debit , untill everything of transfer money works properly the db will not going to change anything , if error occurs it hits back to service and service directly abort task and rollback and stop pool and hit back to controller and controller check the error if it is insufficient balance or normal error for developer and then handles it , it normal error then it gets pass-on to error handler 
## Evidence
engineering_lab=# select * from accounts;
  id  |   name   | balance 
------+----------+---------
 A-02 | Anant    | 2700.00
 A-01 | Abhishek | 5300.00
(2 rows)

engineering_lab=# select * from accounts;
  id  |   name   | balance 
------+----------+---------
 A-01 | Abhishek | 5000.00
 A-02 | Anant    | 3000.00
(2 rows)

engineering_lab=# 


## What I Learned

i learned about using classes or oops in js 
transaction working in node 
actually saw it working live 
testing i did