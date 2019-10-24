CREATE OR REPLACE FUNCTION get_unjoined_events(my_user_id INT) 
   RETURNS TABLE (
       event_id INT,
       user_id INT,
       first_name VARCHAR(50),
       last_name VARCHAR(50),
       gender VARCHAR(1),
       activity_name VARCHAR(50),
       event_date_start TIMESTAMP,
       event_date_end TIMESTAMP,
       event_message VARCHAR,
       event_location VARCHAR(100),
       max_players INT,
       current_player_count INT,
       creator_name VARCHAR(100),
       creator_id INT
) 
AS $$
BEGIN
   RETURN QUERY 
select e.event_id,
       u.user_id,
       u.first_name,
       u.last_name,
       u.gender,
       a.activity_name,
       e.event_date_start,
       e.event_date_end,
       e.event_message,
       concat(e.event_address_1, ' ', e.event_address_2, ' ', e.event_city, ' ', e.event_state, ' ', e.event_zip) :: VARCHAR(100) as event_location,
       e.max_players,
       pc.current_player_count :: INT,
       concat(creator.first_name, ' ', creator.last_name) :: VARCHAR(100) creator_name,
       e.creator_id
       
from events e
     inner join user_events ue
     on e.event_id = ue.event_id 
     left join (select * from users u where u.user_id = my_user_id) u
     on ue.user_id = u.user_id
     inner join activities a
     on e.activity_id = a.activity_id
     inner join (select ue.event_id,count(ue.event_id) current_player_count from user_events ue group by ue.event_id) pc
     on e.event_id = pc.event_id
     inner join users creator
     on e.creator_id = creator.user_id
where u.user_id is null
and   e.public_event is TRUE
and   e.event_date_start >= NOW()
order by e.event_date_start
;
END; $$ 
 
LANGUAGE 'plpgsql';