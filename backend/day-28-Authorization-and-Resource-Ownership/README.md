# DAY 26 Authentication Middleware


## what i have learned 
as we already done login and register but now in this we learn about the user authority to use api routes 
for login register stay open 
but api other then these like home , events , booking should need a authorized user to act one
and api like deleteUser , deleteEvent should need admin authorization

and despite from these the error code varries from 401 unauthorized to 403 forbidden 

actually setup the middleware and build it properly and also a middleware which checks if the api req is from admin


## workflow


POST /api/auth/login
        |
        v
    validate token
        |
        v
    check authority
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




### login and get token (valid till 15m)

POST http://localhost:3000/api/auth/register

{
    "username":"abhishek1",
    "password":"Hello@1234",
    "email":"abhishek2@gmail.com",
    "role":"user"
}

200
Ok

{
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFiaGlzaGVrMkBnbWFpbC5jb20iLCJzdWIiOiJhYmhpc2hlazJAZ21haWwuY29tIiwiaWF0IjoxNzk0NDcwNTcxLCJpc3MiOiJodHRwczovL2V4YW1wbGUuY29tIiwiYXVkIjoiaHR0cHM6Ly9leGFtcGxlLmNvbSIsImV4cCI6MTc5NDQ3MTQ3MX0.ZuK2LJw-AQoGhYSbMnfFIZ56mxjILd68qk9y8XAs9vc",
    "email": "abhishek2@gmail.com",
    "username": "abhishek1"
}



## no token

POST http://localhost:3000/api/auth/register
auth type : no Auth


{
    "username":"abhishek1",
    "password":"Hello@1234",
    "email":"abhishek2@gmail.com",
    "role":"user"
}

401
Unauthorized
{
    "success": false,
    "error": "AUTH_HEADER_MISSING",
    "message": "Authorization header missing"
}



## Malformed token

http://localhost:3000/api/home

token : eyJhbGciOiJIUzI1NiJ9

401
Unauthorized

{
    "success": false,
    "error": "ERR_JWS_INVALID",
    "message": "Malformed token"
}


## wrong token


http://localhost:3000/api/home

valid token:eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFiaGlzaGVrMkBnbWFpbC5jb20iLCJzdWIiOiJhYmhpc2hlazJAZ21haWwuY29tIiwiaWF0IjoxNzk0NDcxNzIxLCJpc3MiOiJodHRwczovL2V4YW1wbGUuY29tIiwiYXVkIjoiaHR0cHM6Ly9leGFtcGxlLmNvbSIsImV4cCI6MTc5NDQ3MjYyMX0.JxnBzGpXUnkesaHyZaVBY4VCP6FOzvjeW2z8lN-ByiI

invalid token : eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFiaGlzaGVrMkBnbWFpbC5jb20iLCJzdWIiOiJhYmhpc2hlazJAZ21haWwuY29tIiwiaWF0IjoxNJodHRwczovL2V4YW1wbGUuY29tIiwiYXVkIjoiaHR0cHM6Ly9leGFtcGxlLmNvbSIsImV4cCI6MTc5NDQ3MjYyMX0.JxnBzGpXUnkesaHyZaVBY4VCP6FOzvjeW2z8lN-ByiI


output 
401
Unauthorized


{
    "success": false,
    "error": "ERR_JWS_SIGNATURE_VERIFICATION_FAILED",
    "message": "Invalid token"
}



## expired Token

http://localhost:3000/api/home

output 

401
Unauthorized

{
    "success": false,
    "error": "ERR_JWT_EXPIRED",
    "message": "Token Expired"
}




## Valid token to home

http://localhost:3000/api/home

auth type : Bearer Token



{
    "message": "welcome user"
}




## User trying for admin api 

http://localhost:3000/api/admin

{
    "username":"abhishek1",
    "password":"Hello@1234",
    "email":"abhishek2@gmail.com",
    "role":"user"
}

403
Forbidden
{
    "success": false,
    "error": "FORBIDDEN",
    "message": "Forbidden: insufficient permissions"
}


## admin hit

http://localhost:3000/api/admin


token : correct one with role embedded

200
OK

{
    "message": "Welcome admin"
}