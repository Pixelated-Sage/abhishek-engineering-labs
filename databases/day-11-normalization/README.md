# Day 11 — Database Design & Normalization

## Bad Design
yes bad design i got to know so much mess and yes if courses are around 20 columns keep expanding 

here is schema 
CREATE TABLE student_course_data (
    student_id VARCHAR(10),
    student_name VARCHAR(50),
    student_email VARCHAR(100),
    course1 VARCHAR(50),
    course2 VARCHAR(50),
    course3 VARCHAR(50)
);


## Problems

things are messy and students identity is there and courses column is dependent on number of courses it wwill expand 
and also if students have zero courses then it will be null

### Update Anomaly
while updation what if the student is enrolled or data is duplicate so every where we have to change its courses and by manually putting names

### Insert Anomaly
i can't create a new course i have to get a student enrolled into that course then i can add that name to this table

### Delete Anomaly

so delete a person who is enrolled in a course and he is the only one with the course now what delete the student and the course is gone forever 


## Normalized Design

students
courses
enrollments

## Why We Separate Them
because the data was messy and in complete if student is not enrolled iin any courses 
now we have student
where only students data is there 
we have courses so without repeating same course name to all the columns we have a list 
and enrollment just the connection here students comes from students table and courses comes froom the list or a sapreate table 

## JOIN
select 
s.name AS student_name,
s.email as student_email,
c.name as course_name

from enrollments e
join students s on e.student_id = s.id
join courses c on e.course_id = c.id;


output 
student_name |  student_email  | course_name  
--------------+-----------------+--------------
 abhishek     | abhi@gmail.com  | DSA
 abhishek2    | abhi2@gmail.com | AI
 abhishek3    | abhi3@gmail.com | AI
 abhishek     | abhi@gmail.com  | AI
 abhishek2    | abhi2@gmail.com | DSA
 abhishek1    | abhi1@gmail.com | DATA SCIENCE


 via join command we can eaily get a single table format data from all the 3 tables 
## What I Learned

i learned about how to identify the messy data the pattern between them and clean it up
but migration of data command are bit big i only understood about distinct insertion but other are bit complex 
but yeah practice can make it working 
