DROP TABLE IF EXISTS users;

 CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS ratings;

  CREATE TABLE IF NOT EXISTS ratings (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    movie_id INT,
    rating DECIMAL NOT NULL,
    user_id INT REFERENCES users (id)
);