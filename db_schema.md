Database schema

table:
users

| id | username | first_name | last_name | email | password |
|----|----------|------------|-----------|-------|----------|
|    |          |            |           |       |          |

table:
ratings

| id | movie_id | rating | user_id |
|----|----------|--------|---------|
|    |          |        |         |

`user_id` column in `ratings` table references `id` in `users` table