-- INSERT INTO users (id, name, email, age)
-- SELECT 
--   -- Generates IDs like U00001, U00002... up to U01000 (fits varchar(6))
--   'U' || LPAD(seq::text, 5, '0') AS id,
  
--   -- Generates User1, User2...
--   'User' || seq AS name,
  
--   -- Generates user1@example.com, user2@example.com... (Unique constraint satisfied)
--   'user' || seq || '@example.com' AS email,
  
--   -- Generates a random age between 18 and 60
--   FLOOR(RANDOM() * (60 - 18 + 1) + 18)::int AS age
-- FROM generate_series(1, 1000) AS seq;



-- delete from users where id = 'U-02';
-- delete from users where id = 'U-03';
-- delete from users where id = 'U-04';
-- delete from users where id = 'U-05';
-- select * from users;



-- select * from users where email = 'user678@example.com';
EXPLAIN ANALYZE
select * from users where name = 'user678';



create index idx_users_name on users(name);

EXPLAIN ANALYZE
select * from users where name = 'user678';