-- lets try to break primary key contraint
-- insert into employees (id,name,email,age,department_id)
-- values 
-- ('E-01','Test','test@gmail.com',28,'D-01');

-- psql:queries.sql:4: ERROR:  duplicate key value violates unique constraint "employees_pkey"
-- DETAIL:  Key (id)=(E-01) already exists.

-- i am preventing a primary key to have duplicate items because primary key is having an identity for each row and if the data is same or duplicate then its false

-- lets break not null contraint
-- INSERT INTO employees (id,name,email,age,department_id)
-- VALUES ('E-03',NULL,'test1@gmail.com',20,'D-01');
-- 
-- 
-- psql:queries.sql:13: ERROR:  null value in column "name" of relation "employees" violates not-null constraint
-- DETAIL:  Failing row contains (E-03, null, test1@gmail.com, 20, D-01).

-- not null contraint we are prevent like if a data like name or phone number which is important to fill otherwise other relation or required data format from backend can break function in backend and can crash or error up the backend so we are putting not null so the cell should have valid and without any worry in backend to check if the data is there or not for each and every cell we target 

-- lets break unique value contraint

-- INSERT INTO employees (id, name, email, age, department_id)
-- VALUES ('E-03', 'Test', 'abhishek@example.com', 20, 'D-01');


-- psql:queries.sql:23: ERROR:  duplicate key value violates unique constraint "employees_email_key"
-- DETAIL:  Key (email)=(abhishek@example.com) already exists.

-- unique is like we are preventing a user to register two time, the data like email each person have one email and unique for everyone and think about a user keep registering the db with same email looks like just filling up the data and space in db which is unnecessary so keep things unique without having it as primary key 

-- lets break age constraint

-- INSERT INTO employees (id, name, email, age, department_id)
-- VALUES ('E-03', 'Test', 'test3@example.com', 15, 'D-01');


-- psql:queries.sql:32: ERROR:  new row for relation "employees" violates check constraint "employees_age_check"
-- DETAIL:  Failing row contains (E-03, Test, test3@example.com, 15, D-01).

-- check condition every time data get inserted it will be checked with a condition if it is true then that data is allowed to be saved.

-- lets try to break foreign key


-- INSERT INTO employees (id, name, email, age, department_id)
-- VALUES ('E-03', 'Test', 'test3@example.com', 20, 'D-99');

-- psql:queries.sql:43: ERROR:  insert or update on table "employees"violates foreign key constraint "employees_department_id_fkey"
-- DETAIL:  Key (department_id)=(D-99) is not present in table "department".


-- dapartment table is holding the major id for employees and act as parent and have a relation with child but without having the id in parent we can't add new one into it who don't have athorization to do it


-- try to delete a department which is already referenced in employees table
-- delete from department where id = 'D-01' ;


-- psql:queries.sql:57: ERROR:  update or delete on table "department" violates foreign key constraint "employees_department_id_fkey" ontable "employees"
-- DETAIL:  Key (id)=(D-01) is still referenced from table "employees".


-- now lets edit the table and create a cascade delete relation between table


-- alter table employees
-- drop constraint employees_department_id_fkey;
-- alter TABLE employees
-- add CONSTRAINT employees_department_id_fkey
-- FOREIGN KEY (department_id)
-- REFERENCES department(id)
-- ON DELETE CASCADE;


-- now lets try to delete 


-- delete from department where id = 'D-01';

-- select * from department;
-- select * from employees;



