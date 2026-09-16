# Day 2 — Express

## What Express solves
express solved lots of sytax and complex parsing and chunking part and getting the body easily and easy to set middlewares and manage routes without any long if else 

## Request pipeline
req comes to server everything inside body got directly managed by express so 
the object we direct get in req is 
{
    method:"POST",
    content-type:"application/json",
    params:"if there",
    query:"if there",
    body{
        name:"Anant"
    }
}
and we can easily manage this like we normally use objects in js

## Middleware

middleware we the functions which comes between the clients req to actual function these actually purpose we can modify is to check api req format modify format and work according to api and acknowledgement we can use
next() do is once a function of middleware does its task then it forward the api to next function or middleware whatever stands next 

## Routes

routes are the api routes extensions 
/users
/users/1 - parameter
/users?id=2 - query

## req.body
express easily format things up as the last class we got that we have to manually setup middleware and catch the chuncks then string it andd then parse it into object format 
but the express already do it so the req.body 
body got directly managed by express so 
the object we direct get in req is 
{
    method:"POST",
    content-type:"application/json",
    params:"if there",
    query:"if there",
    body{
        name:"Anant"
    }
}


## Node HTTP vs Express
HTTP is the actual node backend setup or builder syntax or code to make backends 
express is just a boilerplate or a framework overr the HTTP for quick syntax and remove repeated long syntax or manual task which can managed eassily by converting them into simple snippet


## What I learned

i learned how to create a express server 
create routes 
setup index file
setup package.json
run the server 
setup middleware 
create function
setup cors 
what is cors 

## What confused me

this time nothing confused me one thing i faced like i was editing a const data and idcount so these was not editable so they need let variable ext.