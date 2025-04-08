create database if not exists instagram;
use instagram;
create table user(
id int,
age int,
name varchar (30) not null,
email varchar(50) unique,
followers int default 0,
following int,
constraint check (age >= 13),
primary key(id)
);
create table post(
id int primary key,
content varchar (100),
user_id int,
foreign key (user_id) references user(id)
);

insert into user
(id, age, name, email, followers, following)
values
(1, 14, "adam", "adam@yahoo.in", 123, 145),
(2, 15, "bob", "bob123@gmail.com", 200, 145),
(3, 16, "casey", "casey@email.com", 300, 306),
(4, 17, "donald", "donald@gmail.com", 200, 105);
Select *
From user
Where followers >= 200;

Select name, age, followers, email
From user
Where email IN ("donald@gmail.com", "bob123@gmail.com", "abc@gmail.com");

insert into user
(id, age, name, email, followers, following)
values
(5, 14, "eve", "eve@yahoo.in", 400, 145),
(6, 16, "farah", "farah@gmail.com", 10000, 1000);

Select name, age, followers, email
From user
Where age IN (14, 16);

SELECT count(age)
FROM user
WHERE age = 14;

SELECT age, count(id)
FROM user
GROUP BY age;

SELECT age, max(followers)
FROM user
GROUP BY age;


SELECT age, max(followers)
FROm user
GROUP BY age
HAVING max(followers >200);

SET SQL_SAFE_UPDATES = 0;

Update user
SET followers =600
WHERE age=16;

select * from user;

DELETE FROM user
WHERE age =14;

alter table user
add column city varchar(25) default "Delhi";

alter table user
drop column city;

alter table user
rename to instauser;

use instagram;

alter table instauser
rename to user;

Alter table user
change column followers subs int default 0;

ALTER TABLE user
MODIFY subs INT DEFAULT 5;

insert into user
(id, age, name, email, following)
values
(7, 19, "gemini", "gem@gmail.com", 120);

select * from user;