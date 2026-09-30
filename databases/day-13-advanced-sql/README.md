# Day 13 — SQL advance

## SUBQUERIES
we can insert subqueries in () and use them we can is it in between with where and after from and these queries can be select where and many more and these queries can return a single value or a list 


**Question**
Find students whose age is greater than the average student age.

You must use a subquery:

students
   ↓
calculate AVG(age)
   ↓
use that result
   ↓
find matching students



**solution**
select 
s.name,
s.id,
s.age from students s
where age > (select avg(s.age) from students s);

**output**
   name    |  id  | age 
-----------+------+-----
 abhishek2 | S002 |  24
 abhishek4 | S004 |  26
(2 rows)

- here we used subquery to get a avg value from the table students then matched it with where clause a single avg output came


## IN
in is used in where clause because think about 
using match cases and continouse 'and' and 'or' are there why not pass a list and use it or a subquery which provide multiple item a single where will not going to do it so pass it as a list of items then it can work with in 

**problem**
Find students who are enrolled in the course:

AI

using a subquery rather than a direct JOIN.


**solution**
select 
e.student_id
from enrollments e
where e.course_id in (select id from courses c where c.name = 'AI' );

**output**
 student_id 
------------
 S002
 S003
 S000
(3 rows)

in this the subquery gives a list of id 
(C000,C002)
and where matches those ids which whole list and get out the name

## EXISTS
this is used after where and in that we use a subquery to do checks 
it is used to check the existance of the data if present where clause also used for which basis we are checking the existance 


**problem**
Use EXISTS to find students who have at least one enrollment.

**solution**
select 
s.name as student_name
from students s
where exists (
    select 1 from enrollments e
    where e.student_id = s.id
);

**output**

 student_name 
--------------
 abhishek
 abhishek2
 abhishek3
 abhishek1
(4 rows)


here it checks if the users by that id exists if exist it end the search for that particular user not seach every single repeated thing of 
we are just doing checking a single row from table 1 to every row of table 2 even if we found what we needed extra work it is 


## CASE
case is a if elseif then condition for the sql we can personally condition and accordingly the coulumn catagories things up 


**problem**
Use CASE to classify students:

age < 21       → Junior
21–23          → Intermediate
24+            → Senior

**Solution**

select * , case
when age< 21 then 'Junior'
when age >=21 AND age<=23 then 'intermediate'
else 'Senior'
End as post
from students;


**output**
  id  |   name    |      email      | age |     post     
------+-----------+-----------------+-----+--------------
 S000 | abhishek  | abhi@gmail.com  |  20 | Junior
 S001 | abhishek1 | abhi1@gmail.com |  23 | intermediate
 S002 | abhishek2 | abhi2@gmail.com |  24 | Senior
 S003 | abhishek3 | abhi3@gmail.com |  23 | intermediate
 S004 | abhishek4 | abhi4@gmail.com |  26 | Senior
(5 rows)

creates an another column which categories the users based on age


## COALESCE 
it is a fallback system if null then another location to find or a default value instead of empty space or a null to see 
user efficient view or just a decore if default use but 
when multiple location like example i have 
two columns primaryMail and secondaryMail 
so a proper fall back 
if primary is not present then go fro secondary this is a major use case 

**Problem**
Use COALESCE so a student with no course doesn't produce NULL.

**solution**
select 
s.name,
coalesce(e.course_id,'No course'),
coalesce(c.name,'No course')

from students s
left join enrollments e on s.id = e.student_id
left join courses c on c.id = e.course_id;


**output**


   name    | coalesce  |   coalesce   
-----------+-----------+--------------
 abhishek  | C001      | DSA
 abhishek2 | C000      | AI
 abhishek3 | C000      | AI
 abhishek  | C000      | AI
 abhishek2 | C001      | DSA
 abhishek1 | C002      | DATA SCIENCE
 abhishek4 | No course | No course
(7 rows)



## What I Learned

i learned about queries and how flexibally we can get the data with lots of decores and fallback cases which actually needed in real world db things 
i can relate to these 