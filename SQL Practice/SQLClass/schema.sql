use delta_app;
show tables;

create table user(
id VARCHAR(50) NOT NULL PRIMARY KEY,
username VARCHAR(50) NOT NULL UNIQUE,
email VARCHAR(50) UNIQUE NOT NULL,
password VARCHAR(50) NOT NULL
);

INSERT INTO user (id, username, email, password) VALUES ('1', 'testuser', 'test@example.com', 'passwordtest');