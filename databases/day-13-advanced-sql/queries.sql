select 
s.name,
s.id,
s.age from students s
where age > (select avg(s.age) from students s);


select 
e.student_id
from enrollments e
where e.course_id in (select id from courses c where c.name = 'AI' );

select 
c.name,
s.id,
s.name
from courses c
join enrollments e on c.id = e.course_id
join students s on e.student_id = s.id;



select * from students;

select 
s.name as student_name
from students s
where exists (
    select 1 from enrollments e
    where e.student_id = s.id
);

select * , case
when age< 21 then 'Junior'
when age >=21 AND age<=23 then 'intermediate'
else 'Senior'
End as post
from students;

select 
s.name,
coalesce(e.course_id,'No course'),
coalesce(c.name,'No course')

from students s
left join enrollments e on s.id = e.student_id
left join courses c on c.id = e.course_id;