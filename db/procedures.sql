DROP PROCEDURE IF EXISTS addnewuser;
DROP PROCEDURE IF EXISTS createNewEvent;

CREATE PROCEDURE addNewUser(
    first_name varchar(50), 
    last_name varchar(50), 
    gender varchar(1), 
    email varchar(100), 
    phone_number varchar(10),
    username varchar(20),
    user_password varchar
)
LANGUAGE plpgsql    
AS $$
BEGIN
    if (select count(*) from users u where u.email = $4) > 0
        THEN 
           RAISE NOTICE 'Email already exists';
           RETURN;
        END IF;
    
    if $1 = '' or $2 = '' or $3 = '' or $4 = '' or $6 = '' or $7 = ''
        THEN
            RAISE NOTICE 'Invalid parameter value';
            RETURN;
        END IF;
        
    if (select count(*) from users u where u.username = $6)
        THEN 
            RAISE NOTICE 'Username already exists';
            RETURN;
        END IF;
        
    if $3 != 'M' and $3 != 'F' and $3 IS NOT NULL
        THEN
            RAISE NOTICE 'Invalid gender code';
            RETURN;
        END IF;
        
    if LENGTH($7) < 7
        THEN
            RAISE NOTICE 'Password too short';
            RETURN;
        END IF;
        
    if $7 !~ '[0-9]'
        THEN
            RAISE NOTICE 'Password requires number';
            RETURN;
        END IF;
        
    INSERT INTO users(first_name,last_name,gender,email,phone_number,username,user_password)
    VALUES($1,$2,$3,$4,$5,$6,$7);
    
    RETURN;
END;
$$;


CREATE PROCEDURE createNewEvent(
    activity_id int, 
    event_date_start TIMESTAMP,
    event_date_end TIMESTAMP,
    is_public_event BOOLEAN,
    max_player int,
    creator_id int,
    event_message varchar,
    event_location varchar
)
LANGUAGE plpgsql    
AS $$
DECLARE new_event_id INT;
BEGIN

    if $2 < NOW() or $3 < NOW()
        THEN 
           RAISE NOTICE 'Invalid event date. Must be in the future';
           RETURN;
        END IF;
    
    if (select count(*) from activities a where a.activity_id = $1) < 1
        THEN
            RAISE NOTICE 'Invalid activity id';
            RETURN;
        END IF;
        
    if $5 < (select min_players_required from activities a where a.activity_id = $1)
        THEN 
            RAISE NOTICE 'Max Players is less than min players required';
            RETURN;
        END IF;
        
    if (select count(*) from users u where u.user_id = $6) < 1
        THEN
            RAISE NOTICE 'Invalid user_id for creator';
            RETURN;
        END IF;
        
    if $8 is null or $8 = ''
        THEN
            RAISE NOTICE 'Invalid location';
            RETURN;
        END IF;
        
    INSERT INTO events(activity_id,event_date_start,event_date_end,public_event,creator_id,max_players,event_message,event_location)
    VALUES($1,$2,$3,$4,$6,$5,$7,$8);
    
     select MAX(e.event_id) from events e where e.creator_id = $6 INTO new_event_id;
    
    INSERT INTO user_events(event_id,user_id)
    VALUES(new_event_id,$6);
    
    RETURN;
END;
$$;