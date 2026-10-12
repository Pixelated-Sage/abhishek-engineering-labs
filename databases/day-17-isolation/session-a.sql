-- begin;
BEGIN ISOLATION LEVEL REPEATABLE READ;

select * from students 
where id = '5000';
