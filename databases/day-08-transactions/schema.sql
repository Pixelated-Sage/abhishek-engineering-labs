CREATE TABLE students (
  id varchar(6) PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  email VARCHAR(30) UNIQUE NOT NULL,
  age INTEGER NOT NULL
);



insert into students (id, name, email, age)
values
('S00001', 'Student1', 'student1@example.com', 20),
('S00002', 'Student2', 'student2@example.com', 22),
('S00003', 'Student3', 'student3@example.com', 24)
;
