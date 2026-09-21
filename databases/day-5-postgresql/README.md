# Day 5 — PostgreSQL + SQL

## Database
engineering_lab

## Tables

users
courses
enrollments

## Constraints
these are the bound or tags which specify the behaviour of the coulumn and its impact on data and different table 

Foreign key
primary key
not null
unique
check

## CRUD Queries
create table courses (
    id int(5) primary key,
    name varchar(20) not null
);

select * from courses;

update courses
set name = 'AI Engineering'
where id = 2;

delete from courses where id = 2;


## Relationships
relationship we are create between multiple tables with each other and majorly for relations the primary key of a table is used to create relation with other table
eg i have created users and courses table and both have primary key id 
now another enrollments table is there and i used this command to create the table 
create table enrollments (
  id varchar(6) primary key,
  user_id varchar(6) not null,
  course_id varchar(6) not null,

  FOREIGN key (user_id) REFERENCES users(id) on DELETE CASCADE,
  FOREIGN key (course_id) REFERENCES courses(id) on DELETE CASCADE
);

which connects both id of both tables user and courses with the table enrollment


## JOIN

in this i first time tried join my self and i learned alot 
i learned about inner join for now 
in this we join tables only for temporary basis untill the command is finishs its exection 
the join works like 

USERS                    ENROLLMENTS                  COURSES
------                   -----------                  -------
id ───────────────────> user_id
name                     course_id ─────────────────> id
age


as the command 

SELECT 
    users.name AS student_name,
    courses.name AS course_name,
    users.age
FROM users 
INNER JOIN enrollments 
    ON users.id = enrollments.user_id 
INNER JOIN courses 
    ON enrollments.course_id = courses.id
WHERE users.age < 22;

## Backend Connection
now connection with backend we use db.js in backend and in that we use 
psql module which create pool between the server and db and that pool takes queries from the service file and fit it to db and get the response and take it back to service 

import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})
pool.on("connect", () => {
    console.log("connected to the database");
})


export default pool;


outputs

POST http://localhost:3000/api/courses

{
    "id":"C-06",
    "name":"Graphics Designing"
}

{
    "message": "User Created Successfully",
    "user": {
        "id": "C-06",
        "name": "Graphics Designing"
    }
}

POST http://localhost:3000/api/courses


[
    {
        "id": "C-02",
        "name": "AI Engineering"
    },
    {
        "id": "C-03",
        "name": "Full Stack Development"
    },
    {
        "id": "C-04",
        "name": "Data Science & ML"
    },
    {
        "id": "C-05",
        "name": "Cloud Architecture"
    },
    {
        "id": "C-06",
        "name": "Graphics Designing"
    }
]

## What I learned
i learned about psql and its command and first time tried join commands and also connected backend with neon db which is online db service provider if feels easy then setting up things in linux myself as a new learner to these to just keep it simple 

## What confused me

join confused me alot took one and a half day to understand it but now it is clear a bit but by time it gonna be done 