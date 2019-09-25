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
select u.user_id,
       u.first_name,
       u.last_name,
       u.gender,
       a.activity_name
       
from users u
     inner join user_events ue
     on u.user_id = ue.user_id 
     inner join events e
     on ue.event_id = e.event_id
     inner join activities a
     on e.activity_id = a.activity_id
;
CREATE VIEW current_events_view
AS
select a.activity_name,
       e.created_date,
       e.event_date,
       a.min_players_required,
       e.max_players,
       concat(u.first_name, ' ', u.last_name) creator_name
       
from events e
     inner join activities a
     on e.activity_id = a.activity_id
     inner join users u
     on e.creator_id = u.user_id
where public_event is TRUE
and   event_date >= NOW()
order by event_date
;

