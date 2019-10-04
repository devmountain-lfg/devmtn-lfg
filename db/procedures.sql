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
    event_address_1 varchar,
    event_address_2 varchar,
    event_city varchar(50),
    event_state varchar(2),
    event_zip varchar(10)
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
            RAISE NOTICE 'Invalid address';
            RETURN;
        END IF;
        
    if $10 is null or $10 = ''
        THEN
            RAISE NOTICE 'Invalid city';
            RETURN;
        END IF;
        
    if $11 is null or $11 = ''
        THEN
            RAISE NOTICE 'Invalid state';
            RETURN;
        END IF;
        
    if $12 is null or $12 = ''
        THEN
            RAISE NOTICE 'Invalid zip';
            RETURN;
        END IF;
        
    INSERT INTO events(activity_id,event_date_start,event_date_end,public_event,creator_id,max_players,event_message,event_address_1,event_address_2,event_city,event_state,event_zip)
    VALUES($1,$2,$3,$4,$6,$5,$7,$8,$9,$10,$11,$12);
    
     select MAX(e.event_id) from events e where e.creator_id = $6 INTO new_event_id;
    
    INSERT INTO user_events(event_id,user_id)
    VALUES(new_event_id,$6);
    
    RETURN;
END;
$$;

CREATE PROCEDURE joinEvent(
    user_id int, 
    event_id int
)
LANGUAGE plpgsql    
AS $$
BEGIN

    if (select count(*) from user_events ue where ue.user_id = $1 and ue.event_id = $2) > 0
        THEN 
           RAISE NOTICE 'User has already joined this event';
           RETURN;
        END IF;
    

    INSERT INTO user_events(user_id,event_id)
    VALUES($1,$2);

    RETURN;
END;
$$;


CREATE PROCEDURE unJoinEvent(
    user_id int, 
    event_id int
)
LANGUAGE plpgsql    
AS $$
BEGIN

    if (select count(*) from user_events ue where ue.user_id = $1 and ue.event_id = $2) < 1
        THEN 
           RAISE NOTICE 'User is not in this event';
           RETURN;
        END IF;
    

    DELETE FROM user_events ue WHERE ue.user_id = $1 and ue.event_id = $2;

    RETURN;
END;
$$;


CREATE PROCEDURE updateUser(
    user_id int, 
    first_name varchar(50),
    last_name varchar(50),
    gender varchar(1),
    email varchar(75),
    phone_number varchar(13),
    username varchar(20),
    universal_distance int
)
LANGUAGE plpgsql    
AS $$
BEGIN

    if $5 is not null and (select count(*) from users u where u.email = $5 and u.user_id != $1) > 0
        THEN 
           RAISE NOTICE 'Email already exists';
           RETURN;
        END IF;
        
    if $7 is not null and (select count(*) from users u where u.username = $7 and u.user_id != $1) > 0
        THEN 
            RAISE NOTICE 'Username already exists';
            RETURN;
        END IF;
        
    if $4 != 'M' and $4 != 'F' and $4 IS NOT NULL
        THEN
            RAISE NOTICE 'Invalid gender code';
            RETURN;
        END IF;



    if (select count(*) from users u where u.user_id = $1) < 1
        THEN 
           RAISE NOTICE 'user_id does not exist';
           RETURN;
        END IF;
        
    if $2 is null or $2 = ''
        THEN
            $2 = (select u.first_name from users u where u.user_id = $1);
        END IF;
        
    if $3 is null or $3 = '' 
        THEN
            $3 = (select u.last_name from users u where u.user_id = $1);
        END IF;
        
    if $4 is null or $4 = ''
        THEN
            $4 = (select u.gender from users u where u.user_id = $1);
        END IF;
        
    if $5 is null or $5 = '' 
        THEN
            $5 = (select u.email from users u where u.user_id = $1);
        END IF;
        
    if $6 is null 
        THEN
            $6 = (select u.phone_number from users u where u.user_id = $1);
        END IF;
        
    if $7 is null or $7 = '' 
        THEN
            $7 = (select u.username from users u where u.user_id = $1);
        END IF;
        
    if $8 is null 
        THEN
            $8 = (select u.universal_distance from users u where u.user_id = $1);
        END IF;
    

    UPDATE users u
    SET first_name = $2, 
        last_name = $3,
        gender = $4,
        email = $5,
        phone_number = $6,
        username = $7,
        universal_distance = $8,
        last_updated = NOW()
    WHERE u.user_id = $1;

    RETURN;
END;
$$;