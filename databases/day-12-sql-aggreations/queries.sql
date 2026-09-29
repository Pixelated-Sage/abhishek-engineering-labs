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