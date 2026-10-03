# Day 15 — Pagination

## Problem

loading lots of data in a single time is kinda heavy thing 
| Page | Limit | Offset | Result |
|------|-------|--------|--------|
| 1    | 2     | 0      | 1–2    |
| 2    | 2     | 2      | 3–4    |
| 3    | 2     | 4      | 5–6    |

## Pagination Formula

offset = (page - 1) * limit

## API

GET /api/course/page/query?page=1&limit=2
GET /api/course/page/query?page=2&limit=2
GET /api/course/page/query?page=3&limit=2
GET /api/course/page/query?page=0&limit=2
GET /api/course/page/query?page=abc&limit=2
GET /api/course/page/query?page=1&limit=0

## SQL

select id , name from courses order by id limit $1 offset $2

## Validation
yes validations are being done one limit and page 
it is like a if condition just checking 
both page and limit should be in range of 1-100 if not then error 
## Test Results


  id  |     name     
------+--------------
 C000 | AI
 C001 | DSA
 C002 | DATA SCIENCE
 C003 | Course 3
 C004 | Course 4
 C005 | Course 5
 C006 | Course 6
 C007 | Course 7
 C008 | Course 8
 C009 | Course 9
(10 rows)



http://localhost:3000/api/course/page/query?page=1&limit=2

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



http://localhost:3000/api/course/page/query?page=2&limit=2

[
    {
        "id": "C002",
        "name": "DATA SCIENCE"
    },
    {
        "id": "C003",
        "name": "Course 3"
    }
]



http://localhost:3000/api/course/page/query?page=3&limit=2

[
    {
        "id": "C004",
        "name": "Course 4"
    },
    {
        "id": "C005",
        "name": "Course 5"
    }
]


http://localhost:3000/api/course/page/query?page=0&limit=2
and 
http://localhost:3000/api/course/page/query?page=abc&limit=2
and 
http://localhost:3000/api/course/page/query?page=1&limit=0
{
    "success": false,
    "errorId": "Err_vlu Invalid limit or page"
}


## Why ORDER BY Matters

order by matters because without order by the data can cause inconsisitance missing data or duplication and think of page 1 is having Adcb and page 2 is having DSCA
to make data pridictable

## What I Learned

i learned about how to properly get the data in a order and also limit it and impliment it into pagination 
getting lakhs of rows in a single time can lead to load up the api cutting it into pages is smart work and efficient enough for scaling and perfomance 

but for scaling we need proper update to this pagination that is called cursor/keyset pagination