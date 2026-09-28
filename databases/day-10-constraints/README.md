# Day 10 — Database Integrity

## Constraints
these are the validation rules being done by psql itself before adding data to table

## PRIMARY KEY
create the column a primary key having uniqueness in itself and lead the table 

## NOT NULL
the cell is not about to be null

## UNIQUE
data should be unqiue from all other data present in the column

## CHECK
every time before adding the data to cell a custom condition we can put to check if true then insert and if false then error

## FOREIGN KEY
connecting a column from one table to another and data also relat properly like both should have same data and we can also use delete cascade if parent table delete a row and it is connected one or many foriegn table then those all related data will be deleted too 
no action blocks to delete 
on delete set null just set null when deleted 

## ON DELETE CASCADE
we can also use delete cascade if parent table delete a row and it is connected one or many foriegn table then those all related data will be deleted too 
no action blocks to delete 
on delete set null just set null when deleted 


## Errors Observed

error i observerd 
duplicate key value voilation
more expression
new row relation check contraint
foreign key contraint key not present

## Application Validation vs Database Validation
Application validation
        +
Database constraints
        ↓
Data integrity

application validation are like zod or normal email checks and format for the data before sending the query 
database constraints are the rules setup while creating the table to keep the data consistant and valid 

## What I Learned

i got to know about psql contraints and how they work and how we can use all these with application we can use tooo