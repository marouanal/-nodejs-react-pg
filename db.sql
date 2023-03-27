CREATE DATABASE marouan;

\c marouan;

CREATE TABLE login (
    id SERIAL PRIMARY KEY,
    email VARCHAR(300) NOT NULL,
    username VARCHAR(300) NOT NULL,
    password VARCHAR(300) NOT NULL,
    favsport VARCHAR(300) NOT NULL,
    confirm VARCHAR(300) DEFAULT '0'
);
