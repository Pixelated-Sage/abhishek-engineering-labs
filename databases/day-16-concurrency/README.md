# Day 16 — PostgreSQL Concurrency

## Session A

engineering_lab=# begin;
BEGIN
engineering_lab=*# select * from students;
  id  |   name    |      email      | age 
------+-----------+-----------------+-----
 S000 | abhishek  | abhi@gmail.com  |  20
 S001 | abhishek1 | abhi1@gmail.com |  23
 S002 | abhishek2 | abhi2@gmail.com |  24
 S003 | abhishek3 | abhi3@gmail.com |  23
 S004 | abhishek4 | abhi4@gmail.com |  26
(5 rows)

engineering_lab=*# select * from students where age = 20 for update;
  id  |   name   |     email      | age 
------+----------+----------------+-----
 S000 | abhishek | abhi@gmail.com |  20
(1 row)

engineering_lab=*# commit;
COMMIT
engineering_lab=# 

## Session B

engineering_lab=# begin;
BEGIN
engineering_lab=*# update students set age = 27 where age = 20;
UPDATE 1
engineering_lab=*# select * from students;
  id  |   name    |      email      | age 
------+-----------+-----------------+-----
 S001 | abhishek1 | abhi1@gmail.com |  23
 S002 | abhishek2 | abhi2@gmail.com |  24
 S003 | abhishek3 | abhi3@gmail.com |  23
 S004 | abhishek4 | abhi4@gmail.com |  26
 S000 | abhishek  | abhi@gmail.com  |  27
(5 rows)

engineering_lab=*# 


## What Happened
session A started and i was working casually but for the first command i used for update nothing changes from my side A but before commiting A i begin a session B and begin to update a row which is exactly same as i called from students in session A
but it stayed no ouput came and then i got back to session A committed and as soon as i commited the session B gave output

## FOR UPDATE
for update is isolate and don't allow anyone else to work on the rows we are working

## Row Lock
row lock the particular row is locked for a session no one else can interupt either they have to wait or use advance flags like no wait or skip locked to move with error or next row

## Why Concurrent Updates Matter
it matters because there are saveral points like dirty read , phantom read , write skew , non repeatable 
yes these things impact a user to work the internal conflict make individual task to break 

## What I Learned

i learned about concurrency and how we use it in actuall transaction and real world examples 
commands and advance commands to use it flexibally as required 
and work isolated without breaking someone else or own work 