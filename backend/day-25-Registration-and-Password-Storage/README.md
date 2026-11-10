# DAY 21 Registration and Password storage


## what i have learned 
i learned about the token we store while we making a user 
like session token , access token , and jwt 

but in this what i have made a 
successfull registration of a user and encrypted password stored in data base 
with proper validations of user data (username, password and email) via zod and psql constraints


### registering a user 

POST http://localhost:3000/api/auth/register

{
    "username":"abhishek1",
    "password":"Hello@1234",
    "email":"abhishek@gmail.com"
}


201
Created
{
    "success": true,
    "message": "User registered successfully",
    "data": [
        {
            "username": "abhishek1",
            "email": "abhishek1@gmail.com"
        }
    ]
}


### registering duplicate username

POST http://localhost:3000/api/auth/register

{
    "username":"abhishek1",
    "password":"Hello@1234",
    "email":"abhishek0@gmail.com"
}
409
Conflict
{
    "success": false,
    "error": "U01",
    "message": "U01 User already exist"
}


### registering different user with same email

http://localhost:3000/api/auth/register

{
    "username":"abhishek1",
    "password":"Hello@1234",
    "email":"abhishek1@gmail.com"
}
409
Conflict
{
    "success": false,
    "error": "U01",
    "message": "U01 Email already exist"
}


### regierting with invalid values 

http://localhost:3000/api/auth/register
{
    "username":"abh",
    "password":"Hell2345",
    "email":"abhishek1@gmail.com"
}
400
Bad Request

{
    "success": false,
    "error": "U01",
    "message": "U01 Invalid request body"
}