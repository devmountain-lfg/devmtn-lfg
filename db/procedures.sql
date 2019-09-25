DROP PROCEDURE IF EXISTS addnewuser;

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