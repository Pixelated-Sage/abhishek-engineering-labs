# Day 3 & 4 — Layered Backend Structure

## Architecture

Request
↓
Router
↓
Controller
↓
Service
↓
Data

## Responsibility
request first comes to index.js and then it got checked up with cors and logger hits the log in terminal and then request got handed over the router then that router identify if the request is for get post or whatever then the request handed over to the controlller and then controller handle the req, res and check if the req have some issue like format check and response formattion have been done in this part and then if request is good then service handle the logic of creating or get data then the service function hit the db.js and perform its task over the db and same way db changes service respond back to controller and controller did the work and response get send back to client 

### Router
Matches HTTP method and path.

### Controller
Handles HTTP request/response.

### Service
Contains business logic.

## Why separation matters
each file handle one task at a time and major 
code reusability 
easy maintance 
easy error detection

## What changed from Day 2
instead of doing everything in server.js a single file handle everything we saperated them all 

## What I learned

i learned to saperate the task into multiple file and form a proper easy to write and maintainable code 


# Day 4 — Error Handling

## Normal request pipeline

Request
↓
Router
↓
Controller
↓
Service
↓
Response

## Error pipeline

Request
↓
Router
↓
Controller
↓
Service
↓
Error
↓
next(error)
↓
Error Handler
↓
Response

## What I learned

I learned proper error handling with next and built a middleware to handle the errors

## Errors tested
Case 1
POST /api/user
{
  "name": "Abhishek"
}

{
    "message": "User Created Successfully",
    "user": {
        "id": 1,
        "name": "Abhiu"
    }
}


Case 2
POST /api/user
{
  "name": ""
}

{
    "message": "Kindly fill name"
}



Case 3
POST /api/user
{
  "name": "error"
}
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Error</title>
</head>

<body>
    <pre>Error: Invalid name provided<br> &nbsp; &nbsp;at Object.postUser (file:///home/abhishek/Documents/C02/abhishek-engineering-labs/backend/day-03-architecture/services/user.


Case 4

http://localhost:3000/api/use


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Error</title>
</head>

<body>
    <pre>Cannot POST /api/use</pre>
</body>

</html>


## Why centralized error handling matters


for proper error handling flow can be managed easily and proper user friendly api can be build so for user efficiency 


