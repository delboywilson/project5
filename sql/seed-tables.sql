-- to test db connection only

INSERT INTO users(last_name, first_name, email, password) VALUES ('Bond', 'James', 'james@bond.com', '$2b$10$MKuAv.R8GdJbZHMAOeh4fuSvHLbv86PWrANegLoEeT92sHVKlFhGy');

INSERT INTO schedules(id_user, day, start_time, end_time) VALUES ('1', '1', '2021-02-19 08:00', '2021-02-19 14:00');