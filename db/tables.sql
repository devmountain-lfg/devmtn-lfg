DROP TABLE IF EXISTS user_preferences;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS activities;


CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    created_date TIMESTAMP NOT NULL DEFAULT  NOW(),
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    email varchar(75) NOT NULL,
    phone_number varchar(13) NULL,
    username varchar(20) NOT NULL,
    user_password varchar NOT NULL,
    universal_distance int NOT NULL DEFAULT 10,
    last_updated TIMESTAMP NOT NULL DEFAULT NOW()
)
;
CREATE TABLE activities (
    activity_id SERIAL PRIMARY KEY,
    activity_name varchar(50) NOT NULL,
    description varchar NULL,
    date_invented DATE NULL,
    min_players_required int NULL
) 
;
CREATE TABLE user_preferences (
    user_preference_id SERIAL PRIMARY KEY,
    user_id int REFERENCES users(user_id),
    activity_id int REFERENCES activities(activity_id)
)
;