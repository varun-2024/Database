CREATE DATABASE IF NOT exists college;
USE college;
CREATE TABLE Teacher(
id int primary key not null unique,
name varchar(30) not null,
subject varchar(20) not null,
salary int
);
Insert Into teacher
(id, name, subject, salary)
Values
(23, "ajay", "math", 50000),
(47, "bharat", "english", 60000),
(18, "chetan", "chemistry", 45000),
(9, "divya", "physics", 75000);

select * from teacher;

select * From teacher
where salary > 55000;

alter table teacher
change column salary ctc int;

select * from teacher;

set sql_safe_updates =0;

update teacher
set ctc = ctc + ctc *(25/100);

alter table teacher
add column city varchar(30) not null default("gurgaon");

select * from teacher;

alter table teacher
drop column ctc;

select * from teacher;