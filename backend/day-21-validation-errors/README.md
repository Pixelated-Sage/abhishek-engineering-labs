# DAY 21 validations and errors


## Personal experience while learning

while learning these much validation points and also implimenting these yes it was a bit complex because errors from small things even not putting return filling up my terminal making things complex but proud of my self finally did it all 4 layers done with each and every case present in this file 

and the best thing i liked it alot and total hard coded the server js and hand written readme (i love this shit, the true real effort)

## Rules of Validation
- failfast - before the business logic works the invalid things should be flagged early
- all inputs are unsafe
- clean error formats


## Layers of Validation

### API/DTO
this is structure or syntatic issue in the data we are sending in the body 
status code it throws - 400 Bad Request

### Controller / Middleware

these are the auth context or rate limiting validation check the data if the authority or rates are valid to move forward

status code : 401 unauth or 429 to many requests


### Domain / Business logic

this is the core logic issue basically happens in state transaction or contextual system rules (Does the user have enough account balance)

status code : 422 unprocessable entry


### Persistant / DataBase Layer

this is the ultimate failsafe (psql have its constraint which fix the format to get into the db) 

status code : database driven exception



## for this code i used


**API/DTO layer**

**zod** - for api format validaion
```
const result = apiValidation.safeParse(req.body);
if(!result.success){
    res.status(400).json({
        success:false,
        "Message":"Your input values are wrong",
        "error":result.error.format()
    });
}
```


**controller / contextual layer**

done by direct admin role check 

```
if(role === "admin"){
    res.status(403).json({
        success:false,
        error:"Unauthorized to create admin accounts"
    })
}
```


**Service or domain Logic**
by finding if the user already exist or not in the db

```
if(users.find((user) => (user.name === name && user.email === email ))){
    res.status(422).json({
        success:false,
        message:"User already exist",
        error:"user exists"
    })
}

```

**database constraints works on its own set of rules**



## Test Cases


### For 400 bad request Name

**name is required and cannot be empty**

http://localhost:3000/users
{
    // "name":"abhishek",
    "email":"abhishekaj590@gmail.com",
    "role":"admin"
}


response
status : 400 Bad Request
{
    "success": false,
    "Message": "Your input values are wrong",
    "error": {
        "_errors": [],
        "name": {
            "_errors": [
                "Invalid input: expected string, received undefined"
            ]
        }
    }
}


**invalid name input (require atleast 5 min value)**

http://localhost:3000/users

{
    "name":"ab1",
    "email":"abhishekaj5902@gmail.com",
    "role":"user"
}

response 
status code : 400 Bad Request

{
    "success": false,
    "Message": "Your input values are wrong",
    "error": {
        "_errors": [],
        "name": {
            "_errors": [
                "Invalid input: expected string, received number"
            ]
        }
    }
}


**Different datatype name input (Handled by zod)**

http://localhost:3000/users

{
    "name":1,
    "email":"abhishekaj5902@gmail.com",
    "role":"user"
}

response 

status code : 400 Bad Request
{
    "success": false,
    "Message": "Your input values are wrong",
    "error": {
        "_errors": [],
        "name": {
            "_errors": [
                "Invalid input: expected string, received number"
            ]
        }
    }
}


### For 400 bad request Email

**email is required and cannot be empty**

http://localhost:3000/users
{
    "name":"abhishek",
    // "email":"abhishekaj590@gmail.com",
    "role":"admin"
}


response
status : 400 Bad Request
{
    "success": false,
    "Message": "Your input values are wrong",
    "error": {
        "_errors": [],
        "email": {
            "_errors": [
                "Invalid input: expected string, received undefined"
            ]
        }
    }
}

**invalid email input (require actual format of email @gmail.com)**

http://localhost:3000/users
{
    "name":"Abhishek2",
    "email":"abhishekaj5902gmail.com",
    "role":"user"
}

response 
status code : 400 bad request

{
    "success": false,
    "Message": "Your input values are wrong",
    "error": {
        "_errors": [],
        "email": {
            "_errors": [
                "Invalid email format structure"
            ]
        }
    }
}

**Different datatype email input (Handled by zod)**

http://localhost:3000/users
{
    "name":"Abhishek2",
    "email":56,
    "role":"user"
}

response

status code : 400 bad request 

{
    "success": false,
    "Message": "Your input values are wrong",
    "error": {
        "_errors": [],
        "email": {
            "_errors": [
                "Invalid input: expected string, received number"
            ]
        }
    }
}


**User already exist (service layer error)**

http://localhost:3000/users

{
    "name":"abhishek",
    "email":"abhishekaj590@gmail.com",
    "role":"user"
}

response 

status code : 422 Unprocessable Entity
{
    "success": false,
    "message": "User already exist",
    "error": "user exists"
}


**Valid input and user creation**

http://localhost:3000/users
{
    "name":"abhishek1",
    "email":"abhishekaj5901@gmail.com",
    "role":"user"
}

response 
status code: 200 Created

{
    "success": true,
    "message": "user Created successfully"
}




**Unknown route**

http://localhost:3000/xyz

response 

status code : 404 Not Found
{
    "message": "the requested endpoint [POST] /xyz",
    "success": false,
    "error": "Not Found"
}


### For 500 (i specially throw an error to showcase)**

http://localhost:3000/users

{
    "name":"Abhishek2",
    "email":"abhishekaj5902@gmail.com",
    "role":"user"
}

response 
status code : 500 internal server error

{
    "success": false,
    "error": "Internal server error",
    "message": "DB connection failed"
}