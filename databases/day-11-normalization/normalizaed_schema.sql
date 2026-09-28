-- create table students (
--     id varchar(20) primary key,
--     name varchar(50) not null,
--     email varchar(100) unique not null

-- );

-- create table courses (
--     id varchar(20) primary key,
--     name varchar(50) not null
-- );

-- create table enrollments (
--     id varchar (20) primary key,
--     student_id varchar(20) references students(id),
--     course_id varchar(20) references courses(id) 
-- );


insert into students (id,name,email)
values
('S000','abhishek','abhi@gmail.com'),
('S001','abhishek1','abhi1@gmail.com'),
('S002','abhishek2','abhi2@gmail.com'),
('S003','abhishek3','abhi3@gmail.com');

insert into courses (id,name)
values
('C000','AI'),
('C001','DSA'),
('C002','DATA SCIENCE');

INSERT into enrollments (id, student_id, course_id)
values
('E000','S000','C001'),
('E001','S002','C000'),
('E002','S003','C000'),
('E003','S000','C000'),
('E004','S002','C001'),
('E005','S001','C002');