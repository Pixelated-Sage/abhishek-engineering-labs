CREATE TABLE student_course_data (
    student_id VARCHAR(10),
    student_name VARCHAR(50),
    student_email VARCHAR(100),
    course1 VARCHAR(50),
    course2 VARCHAR(50),
    course3 VARCHAR(50)
);


INSERT INTO student_course_data (student_id, student_name, student_email, course1, course2, course3)
VALUES 
('S001', 'Alice Smith', 'alice@email.com', 'Introduction to Python', 'Calculus I', 'Data Structures'),
('S002', 'Bob Jones', 'bob@email.com', 'World History', 'Creative Writing', NULL),
('S003', 'Charlie Brown', 'charlie@email.com', 'Introduction to Python', NULL, NULL);
