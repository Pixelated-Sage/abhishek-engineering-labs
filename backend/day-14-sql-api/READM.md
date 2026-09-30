# Day 14 — SQL + Backend

## API
GET /api/courses
GET /api/courses/:id
GET /api/courses/find?minStudents=2

## SQL Used
Select * from courses
Select * from courses where id = $1
select c.id, c.name from courses c join enrollments e on c.id = e.course_id group by c.id , c.name having count(e.student_id) > $1

## Request Flow
HTTP query
↓
Controller
↓
Service
↓
Repository
↓
SQL
↓
PostgreSQL

## Query Reasoning
the api having query have a basic logic just extract the query value and put it into the query of sql 

now one by one sql queries we have 
one is the just get from courses all the data comes out 
2nd is the get the course where id = users value in params
3rd is the one is complex query 
we get out id and name of the courses and just join a table of enrollments and according we made buckets for each course and got all the students numeber under each course and count it down and just put a condition that counting should be more that users input 

## Results
http://localhost:3000/api/courses

[
    {
        "id": "C000",
        "name": "AI"
    },
    {
        "id": "C001",
        "name": "DSA"
    },
    {
        "id": "C002",
        "name": "DATA SCIENCE"
    }
]

http://localhost:3000/api/courses/C001

{
    "id": "C001",
    "name": "DSA"
}

http://localhost:3000/api/courses/find?maxStudents=1

[
    {
        "id": "C000",
        "name": "AI"
    },
    {
        "id": "C001",
        "name": "DSA"
    }
]



## What I Learned

i learned about the proper backend structure and working and without any service or extra logic of js directly hit the sql query and get the output without any alter of the output we just response back the output to the user