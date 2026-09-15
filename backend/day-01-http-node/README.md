# Day 1 - HTTP + Node.js

## What I learned
i learned about how to create api, send the data back , write headers and actually test them in post man

## What I understood

A client sends an HTTP request containing a method, URL,
headers and sometimes a body.

Node.js receives that request through the HTTP server.
The server checks the method and URL, performs the required
logic, and sends an HTTP response containing a status code,
headers and optionally a response body.

For POST /users, the request body arrives in chunks.
The chunks are collected and converted into a string,
then parsed from JSON before the user data is processed.


## Request Lifecycle

client -> server -> processing -> response -> client

## Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | / | Welcome page |
| GET | /users | Return users |
| POST | /users | Create user |

## Evidence

- Tested GET / using Postman
- Tested GET /users using Postman
- Tested POST /users using Postman
- Tested invalid user input
- Tested unknown route


## How the server works 
run the command in the terminal 


`node index.js`

## Erros I tested

- it was the dificult to make post request for the first time as the req i have to convert in string then parse it and then use it , This got me Stuck for 20 min.


curl
 ↓
HTTP Request
 ↓
Node HTTP Server
 ↓
Route
 ↓
Logic
 ↓
HTTP Response
 ↓
curl