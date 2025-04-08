-- This SQL script creates a table named 'student', inserts some records into it, and performs various queries and updates.

create table student(
roll_no int unique not null primary key,
name varchar(30) not null,
city varchar(20),
marks int
);

insert into student
(roll_no, name, city, marks)
values
(110, "adam", "Delhi", 76),
(108, "bob", "Mumbai", 65),
(124, "casey", "Pune", 94),
(112, "duke", "Pune", 80);

select * from student;

select * from student
where marks > 75;

select city from student
group by city;

select distinct city 
from student;

select city, max(marks)
from student
group by city;

select avg(marks) from student;

alter table student
add column grade varchar(2);

update student
set grade = "O" where marks > 80;
update student
set grade = "A" where marks >70 and marks <= 80;
update student
set grade = "B" where marks >60 and marks <= 70;

truncate student;