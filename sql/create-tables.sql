-- to test db connection only

DROP TABLE IF EXISTS users;

 CREATE TABLE IF NOT EXISTS users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    last_name VARCHAR(50) NOT NULL, 
    first_name VARCHAR(50) NOT NULL, 
    email VARCHAR(50) NOT NULL UNIQUE, 
    password VARCHAR(100) NOT NULL, 
    PRIMARY KEY (user_id)
);

DROP TABLE IF EXISTS schedules;

  CREATE TABLE IF NOT EXISTS schedules (
    schedule_id INT GENERATED ALWAYS AS IDENTITY,
    id_user INT,
    day NUMERIC(1) NOT NULL, 
    start_time TIMESTAMPTZ NOT NULL, 
    end_time TIMESTAMPTZ NOT NULL,
    PRIMARY KEY(schedule_id),
    CONSTRAINT fk_ID
      FOREIGN KEY(ID_user) 
        REFERENCES users (user_id)
);