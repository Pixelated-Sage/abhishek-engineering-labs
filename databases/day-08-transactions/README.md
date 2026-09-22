day 08 transactions 

so i learned about transactions and ACID properties 

it is like 
we are using a snapshot or a frozen environment which is distict or saperated from all other users and we are doing our tasks as we want untill we commit 
and if in between the task we deleted the wrong things and we are in ghosted environment so simply we can roll back in this till the point we started the task 

in this we have 3 things 
begin - as we write this psql create a snapshot via MVCC and create a ghost environment isolated from other 
ROLLBACK - we can se some checkpoints via (SAVEPOINT) and name it and if any query fails up we can easily roll back to checkpoint or roll back to whole things to nothing as fresh frozen point we 
COMMIT - this moment we push all the code to actual disk permanent one no rollback nothing and everyone can see it 

ACID 

A- all or nothing 
C - consistancy 
I - isolation
D - durability 


queries i tried 
 psql -d engineering_lab 
psql (18.6)
Type "help" for help.

engineering_lab=# select * from students;
   id   |   name   |        email         | age 
--------+----------+----------------------+-----
 S00001 | Student1 | student1@example.com |  20
 S00003 | Student3 | student3@example.com |  24
(2 rows)

engineering_lab=# begin;
BEGIN
engineering_lab=*# update students set age = 21 where id = 'S00001';
UPDATE 1
engineering_lab=*# select * from students;
   id   |   name   |        email         | age 
--------+----------+----------------------+-----
 S00003 | Student3 | student3@example.com |  24
 S00001 | Student1 | student1@example.com |  21
(2 rows)

engineering_lab=*# savepoint sp1;
SAVEPOINT
engineering_lab=*# delete from students where id = 'S00001';
DELETE 1
engineering_lab=*# select * from students;
   id   |   name   |        email         | age 
--------+----------+----------------------+-----
 S00003 | Student3 | student3@example.com |  24
(1 row)

engineering_lab=*# savepoint sp2;
SAVEPOINT
engineering_lab=*# delete from students where id = 'S00003';
DELETE 1
engineering_lab=*# select * from students;
 id | name | email | age 
----+------+-------+-----
(0 rows)

engineering_lab=*# rollback to sp2;
ROLLBACK
engineering_lab=*# select * from students;
   id   |   name   |        email         | age 
--------+----------+----------------------+-----
 S00003 | Student3 | student3@example.com |  24
(1 row)

engineering_lab=*# rollback;
ROLLBACK
engineering_lab=# select * from students;
   id   |   name   |        email         | age 
--------+----------+----------------------+-----
 S00001 | Student1 | student1@example.com |  20
 S00003 | Student3 | student3@example.com |  24
(2 rows)

engineering_lab=# 




