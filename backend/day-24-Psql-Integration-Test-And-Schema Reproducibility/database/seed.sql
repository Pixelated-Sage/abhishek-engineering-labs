
INSERT INTO users (id, name, email, age)
VALUES 
  ('U-02', 'Anant', 'anant@gmail.com', 22),
  ('U-03', 'Rahul', 'rahul@gmail.com', 20),
  ('U-04', 'Priya', 'priya@gmail.com', 21),
  ('U-05', 'Amit', 'amit@gmail.com', 23);


INSERT INTO courses (id, name)
VALUES 
  ('C-02', 'AI Engineering'),
  ('C-03', 'Full Stack Development'),
  ('C-04', 'Data Science & ML'),
  ('C-05', 'Cloud Architecture');



insert into enrollments (id , user_id,course_id)
VALUES 
('E-01','U-02','C-02'),
('E-02','U-03','C-02');
