DROP TABLE IF EXISTS user_preferences;
DROP TABLE IF EXISTS user_events;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS activities;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    created_date TIMESTAMP NOT NULL DEFAULT  NOW(),
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    gender varchar(1) NULL,
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
CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    activity_id int REFERENCES activities(activity_id),
    created_date TIMESTAMP DEFAULT NOW(),
    public_event BOOLEAN,
    creator_id int REFERENCES users(user_id),
    max_players int
)
;
CREATE TABLE user_events (
    user_id int REFERENCES users(user_id),
    event_id int REFERENCES events(event_id)
)
;
