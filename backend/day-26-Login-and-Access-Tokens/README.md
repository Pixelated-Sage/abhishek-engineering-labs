# DAY 26 Login and Access Tokens


## what i have learned 
i learned about the token we store while we making a user 
like session token , access token , and jwt 


and as last server the register was already created but now a logic is also working a user can easily login into and jwt token we pass back 



## workflow


POST /api/auth/login
        |
        v
   Zod validation
        |
        v
  Auth Controller
        |
        v
   Auth Service
        |
        v
 Find user by email
        |
        v
 Verify password (Argon2id)
        |
        v
 Generate signed JWT
        |
        v
 Return access token




### registering a user 

POST http://localhost:3000/api/auth/register

{
    "username":"abhishek1",
    "password":"Hello@1234",
    "email":"abhishek2@gmail.com"
}


201
Created
{
    "success": true,
    "message": "User registered successfully",
    "data": [
        {
            "username": "abhishek1",
            "email": "abhishek2@gmail.com"
        }
    ]
}


## login a user

http://localhost:3000/api/auth/login

{
    // "username":"abhishek1",
    "password":"Hello@1234",
    "email":"abhishek2@gmail.com"
}


200
OK

{
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFiaGlzaGVrMkBnbWFpbC5jb20iLCJzdWIiOiJhYmhpc2hlazJAZ21haWwuY29tIiwiaWF0IjoxNzk0NDY2MDM5LCJpc3MiOiJodHRwczovL2V4YW1wbGUuY29tIiwiYXVkIjoiaHR0cHM6Ly9leGFtcGxlLmNvbSIsImV4cCI6MTc5NDQ2NjkzOX0.l7JPiv4izey2mxSph5PLEJkStf9d_i5Yan1s9y2sdKM",
    "email": "abhishek2@gmail.com",
    "username": "abhishek1"
}

## invalid password


http://localhost:3000/api/auth/login

{
    // "username":"abhishek1",
    "password":"Hello@1234",
    "email":"abhishek2@gmail.com"
}

401
Unauthorized

{
    "success": false,
    "error": "L01",
    "message": "L01_inValid credentials"
}



## User not found

http://localhost:3000/api/auth/login

{
    // "username":"abhishek1",
    "password":"Hello@1234",
    "email":"abhishek1@gmail.com"
}

401
Unauthorized


{
    "success": false,
    "error": "U01",
    "message": "U1_User Not found"
}


## missing password

http://localhost:3000/api/auth/login

{
    // "username":"abhishek1",
    // "password":"Hello@1234",
    "email":"abhishek1@gmail.com"
}


400
Bad Request

{
    "success": false,
    "error": "L02",
    "message": "L02 Invalid request body"
}


## missing password

http://localhost:3000/api/auth/login

{
    // "username":"abhishek1",
    "password":"Hello@1234"
    // "email":"abhishek1@gmail.com"
}


400
Bad Request

{
    "success": false,
    "error": "L02",
    "message": "L02 Invalid request body"
}


## within 1m token check 

http://localhost:3000/tokenCheck


header bearer Token

output 
200
OK

{
    "message": "Token is valid"
}



## after 1m token check 


http://localhost:3000/tokenCheck


header bearer Token


401
Unauthorized

{
    "message": "Token expired"
}