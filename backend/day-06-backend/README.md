# Day 6 — Repository Pattern

## Architecture

Request
↓
Router
↓
Controller
↓
Service
↓
Repository
↓
PostgreSQL

## Responsibility

Router:
HTTP method + path

Controller:
HTTP request/response

Service:
Business logic

Repository:
Database access

## Why repository exists

so service don't handle 2 task as per the rules one file handle only one task 
and saperate the orm or psql queries can make it easy for any changes in db 
we don't have to change large amount of services and queries we just have to change things in repository file
and reusablility 

## What changed from Day 5

added repository and updated service files 

## Experiment

PostgreSQL repository
vs
In-memory repository


also tried it and it is very easy 
2 line change in repository and we are shifted from psql to local array and response data got redirected to local data and also just one work change in service file instead of search lots of codes and find and change every single place where i used what 
GET WORKDED


http://localhost:3000/api/courses
[
    {
        "id": "C-01",
        "name": "Backend"
    }
]

After undo the line 
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

i learned to create backend in proper architecture with proper psql and local data shifts 