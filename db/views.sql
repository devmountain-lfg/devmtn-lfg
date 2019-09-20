DROP VIEW IF EXISTS user_preferences_view;
DROP VIEW IF EXISTS user_events_view;


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
