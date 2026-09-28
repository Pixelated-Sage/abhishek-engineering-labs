-- create table department(
--     id VARCHAR(10) primary key,
--     name varchar (50) not null unique
-- );

-- create table employees (
--     id varchar(10) primary key,
--     name varchar(50) not null,
--     email varchar(50) unique not null,
--     age integer check (age>=18),
--     department_id varchar(10),
--     foreign key (department_id) references department(id)
-- );



-- INSERT INTO department (id, name)
-- VALUES
-- ('D-01', 'Engineering'),
-- ('D-02', 'Design');

-- INSERT INTO employees (id, name, email, age, department_id)
-- VALUES
-- ('E-01', 'Abhishek', 'abhishek@example.com', 21, 'D-01'),
-- ('E-02', 'Anant', 'anant@example.com', 22, 'D-02');


