# Day 12 — SQL Aggregation

## JOIN
join do the strict joining of the table on the bases of left and right table and for each join we have a mental map of table standing in left and table standing in right and after joing how one by one it matches item and filles up the new table just for output

## GROUP BY
group by create buckets eg
column having courses id 
  id  | student_id | course_id 
------+------------+-----------
 E000 | S000       | C001
 E001 | S002       | C000
 E002 | S003       | C000
 E003 | S000       | C000
 E004 | S002       | C001
 E005 | S001       | C002


 in this if i group by course_id then what happens 
 - it start creating buckets or each specific value 
 bucket 1 - c001 having values or rows 
 E000
 E004
bucket 2 - c002 having values or rows 
 E005
 bucket 3 - c000 having values or rows 
 E001
 E002
 E003

 then as per the bucket the aggregation impact over it 
## COUNT
count just count the items present in the groups or bucket we made so 
C001 HAVE 2
C002 have 1
C000 have 3

## SUM
sum do the addition in buckets as same as the count

## AVG
avg do the average formula on the values under a bucket

## MIN / MAX
min max finds out the min or max in the bucket 
## WHERE vs HAVING

where is clause just used before group by and these impact on all the rows 
having is clause used after the group by and this impact on groups only 
## Queries
select * from students;
select * from courses;
select * from enrollments;



select 
c.name as course_name ,
count(e.student_id) as total_enrollments
from courses c
join enrollments e on c.id = e.course_id
group by c.id;


select 
s.id as student_id,
s.name as student_name,
count(e.course_id) as total_enrollments
from students s
join enrollments e on s.id = e.student_id
group by s.id;

select 
s.id as student_id,
s.name as student_name,
count(e.course_id) as total_enrollments
from students s
join enrollments e on s.id = e.student_id
group by s.id , s.name
having count(e.course_id)>1;


select 
c.name as course_name ,
count(e.student_id) as total_enrollments
from courses c
join enrollments e on c.id = e.course_id
group by c.id
order by total_enrollments DESC
limit 1;

-- alter table students
-- add age int default 0;

-- update students
-- set age = 20 where id = 'S000';
-- update students
-- set age = 23 where id = 'S001';
-- update students
-- set age = 24 where id = 'S002';
-- update students
-- set age = 23 where id = 'S003';



select 
c.name as cours_name,
round(avg(s.age),2) as average_age
from courses c
join enrollments e on c.id = e.course_id
join students s on e.student_id = s.id
GROUP BY c.id

output
 id  |   name    |      email      | age 
------+-----------+-----------------+-----
 S000 | abhishek  | abhi@gmail.com  |  20
 S001 | abhishek1 | abhi1@gmail.com |  23
 S002 | abhishek2 | abhi2@gmail.com |  24
 S003 | abhishek3 | abhi3@gmail.com |  23
(4 rows)

  id  |     name     
------+--------------
 C000 | AI
 C001 | DSA
 C002 | DATA SCIENCE
(3 rows)

  id  | student_id | course_id 
------+------------+-----------
 E000 | S000       | C001
 E001 | S002       | C000
 E002 | S003       | C000
 E003 | S000       | C000
 E004 | S002       | C001
 E005 | S001       | C002
(6 rows)

 course_name  | total_enrollments 
--------------+-------------------
 AI           |                 3
 DSA          |                 2
 DATA SCIENCE |                 1
(3 rows)

 student_id | student_name | total_enrollments 
------------+--------------+-------------------
 S002       | abhishek2    |                 2
 S000       | abhishek     |                 2
 S003       | abhishek3    |                 1
 S001       | abhishek1    |                 1
(4 rows)

 student_id | student_name | total_enrollments 
------------+--------------+-------------------
 S002       | abhishek2    |                 2
 S000       | abhishek     |                 2
(2 rows)

 course_name | total_enrollments 
-------------+-------------------
 AI          |                 3
(1 row)

  cours_name  | average_age 
--------------+-------------
 AI           |       22.33
 DSA          |       22.00
 DATA SCIENCE |       23.00
(3 rows)

## What I Learned

i learned about the buckets and join and mental model to think about join in mind without being confused about what is happening and i learned about join and group by and all the things used above 