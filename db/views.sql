DROP VIEW IF EXISTS user_preferences_view;
DROP VIEW IF EXISTS user_events_view;
DROP VIEW IF EXISTS current_events_view;


CREATE VIEW user_preferences_view
AS
select u.user_id,
       u.first_name,
       u.last_name,
       u.gender,
       a.activity_name
       
from users u
     inner join user_preferences up
     on u.user_id = up.user_id 
     inner join activities a
     on up.activity_id = a.activity_id
;
CREATE VIEW user_events_view
AS
select e.event_id,
       u.user_id,
       u.first_name,
       u.last_name,
       u.gender,
       a.activity_name,
       e.event_date_start,
       e.event_date_end,
       e.event_message,
       concat(e.event_address_1, ' ', e.event_address_2, ' ', e.event_city, ' ', e.event_state, ' ', e.event_zip) as event_location,
       e.max_players,
       pc.current_player_count,
       concat(creator.first_name, ' ', creator.last_name) creator_name,
       creator_id
       
from users u
     inner join user_events ue
     on u.user_id = ue.user_id 
     inner join events e
     on ue.event_id = e.event_id
     inner join activities a
     on e.activity_id = a.activity_id
     inner join (select ue.event_id,count(ue.event_id) current_player_count from user_events ue group by ue.event_id) pc
     on e.event_id = pc.event_id
     inner join users creator
     on e.creator_id = creator.user_id
;

CREATE VIEW current_events_view
AS
select e.event_id,
       a.activity_name,
       e.created_date,
       e.event_date_start,
       e.event_date_end,
       a.min_players_required,
       e.max_players,
       pc.player_count current_player_count,
       concat(u.first_name, ' ', u.last_name) creator_name,
       e.creator_id,
       e.event_message,
       concat(e.event_address_1, ' ', e.event_address_2, ' ', e.event_city, ' ', e.event_state, ' ', e.event_zip) as event_location
       
from events e
     inner join activities a
     on e.activity_id = a.activity_id
     inner join users u
     on e.creator_id = u.user_id
     inner join (select ue.event_id,count(ue.event_id) player_count from user_events ue group by ue.event_id) pc
     on e.event_id = pc.event_id
where public_event is TRUE
and   event_date_start >= NOW()
order by event_date_start
;

