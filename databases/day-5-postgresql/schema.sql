create table courses (
  id varchar(6) primary key,
  name varchar(108) not null
);
CREATE TABLE users (
  id varchar(6) PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  email VARCHAR(254) UNIQUE NOT NULL,
  age INTEGER NOT NULL check (age >= 18),
);

create table enrollments (
  id varchar(6) primary key,
  user_id varchar(6) not null,
  course_id varchar(6) not null,
  UNIQUE (user_id, course_id),

  FOREIGN key (user_id) REFERENCES users(id) on DELETE CASCADE,
  FOREIGN key (course_id) REFERENCES courses(id) on DELETE CASCADE
);

