const bcrypt = require("bcrypt");
const Chatkit = require('@pusher/chatkit-server');
const chat_instance = 'v1:us1:e2d98014-702f-4f97-9c50-067d5f18eafc';
const secret_key = '246f89f5-f9a6-489f-a259-e9223238bac2:AnIcpJQ7u6cxH05w0Xt8S+OAten/AcL2D04r2Nmwk4s=';

const chatkit = new Chatkit.default({
    instanceLocator: chat_instance,
    key: secret_key
});

module.exports = {
    createNewUser: async (req, res) => {
        try {
            const db = req.app.get('db');
            const checkForNumber = (str) => {
                const numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                let containsNum = false;

                for (var i = 0; i < str.length; i++) {
                    if (str.includes(numArr[i])) {
                        containsNum = true;
                        return;
                    }
                }

                return containsNum;
            }

            const checkForNonNumbers = (str) => {
                const charArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '@', '#', '$', '%', '&', '*', '!', '+'];
                let containsChar = false;

                for (var i = 0; i < str.length; i++) {
                    if (str.includes(charArr[i])) {
                        containsChar = true;
                        return;
                    }
                }

                return containsChar;
            }

            const { firstName, lastName, gender, email, phoneNumber, username, password } = req.body;
            const hash = await bcrypt.hash(password, 10);
            // const [usernameCount] = await db.query(`select COUNT(*) from users where username = ${username}`);

            // ToDo: Add check for already existing email and username in DB.
            if (firstName === null || firstName === "") return res.status(400).send('Please enter your first name');
            if (lastName === null || lastName === "") return res.status(400).send('Please enter your last name');
            if (gender !== null && gender !== "M" && gender !== "F") return res.status(400).send('Invalid gender. Please enter M, F or leave blank');
            if (email === null || email === "" || !email.includes('@')) return res.status(400).send('Invalid email');
            if (username === null || username === "") return res.status(400).send('Invalid username');
            // if (usernameCount > 0) return res.status(400).send('username is unavailable');
            if (password === null || password === "" || password.length < 7 || checkForNumber(password) === false) return res.status(400).send('Invalid password. Password must be at least 7 characters long and contain at least one number');
            if (phoneNumber !== null && checkForNonNumbers(phoneNumber) === true) return res.status(400).send('Invalid character in Phone Number');

            await db.query('call addNewUser($1,$2,$3,$4,$5,$6,$7)', [firstName, lastName, gender, email, phoneNumber, username, hash]);
            res.send(`${firstName} ${lastName} has been added`);

        } catch (error) {
            res.send(error);
        }

    },

    filthyFilter: (req, res) => {
        const badNouns = ['shit', 'bitch', 'ass', 'asshole', 'jackass', 'dick', 'cunt', 'hell', 'god', 'pussy', 'nigger'];
        const badVerbs = ['fuck'];
        const badAdjs = ['shitty', 'fucking'];
        const badInterjections = ['damn'];

        const cleanNouns = ['cupcake', 'ferry', 'princess', 'sweetheart', 'shiz'];
        const cleanVerbs = ['kiss', 'smile', 'giggle', 'dance', 'love'];
        const cleanAdjs = ['cute', 'pretty', 'silly'];
        const cleanInterjections = ['gas planet', 'poop', 'holy smokes', 'gosh'];

        Array.prototype.remove = function () {
            var what, a = arguments, L = a.length, ax;
            while (L && this.length) {
                what = a[--L];
                while ((ax = this.indexOf(what)) !== -1) {
                    this.splice(ax, 1);
                }
            }
            console.log('This = ', this, 'indexOf = ', ax)
            return this;
        };

        const cleanFilthyWords = (str) => {
            let text = str.split(' ');

            for (var i = 0; i < text.length; i++) {
                let a = '';
                if (text[i].includes("!")) text[i] = text[i].split('').remove("!").join('');
                if (text[i].includes(".")) text[i] = text[i].split('').remove(".").join('');
                if (text[i].includes(",")) text[i] = text[i].split('').remove(",").join('');
                if (text[i].includes("?")) text[i] = text[i].split('').remove("?").join('');

                if (badNouns.includes(text[i].toLowerCase())) {
                    text[i] = cleanNouns[Math.floor(Math.random() * cleanNouns.length)];
                }
                else if (badVerbs.includes(text[i].toLowerCase())) {
                    text[i] = cleanVerbs[Math.floor(Math.random() * cleanVerbs.length)];
                }
                else if (badAdjs.includes(text[i].toLowerCase())) {
                    text[i] = cleanAdjs[Math.floor(Math.random() * cleanAdjs.length)];
                }
                else if (badInterjections.includes(text[i].toLowerCase())) {
                    text[i] = cleanInterjections[Math.floor(Math.random() * cleanInterjections.length)];
                }
                else text[i] = text[i];

            }

            return text.join(' ');
        }

        const filteredMessage = cleanFilthyWords(req.body.message);
        res.send(filteredMessage);
    },

    createNewEvent: async (req, res) => {
        try {
            const db = req.app.get('db');
            const {
                activityId,
                eventStart,
                eventEnd,
                isPublic,
                maxPlayers,
                message,
                address1,
                address2,
                city,
                state,
                zip
            } = req.body;
            let today = new Date();
            let eventDateStart = new Date(eventStart);
            let eventDateEnd = new Date(eventEnd);
            today = today.getTime();
            eventDateStart = eventDateStart.getTime();
            eventDateEnd = eventDateEnd.getTime();

            if (!activityId) return res.status(400).send("Please select an activity");
            if (!eventStart || !eventEnd) return res.status(400).send("Please enter a Start and End date and time");
            if (eventDateStart < today || eventDateEnd < today) return res.status(400).send("Invalid date. Event date is in the past");
            if (isPublic === null) return res.status(400).send("Please choose public or private");
            if (!maxPlayers || maxPlayers < 2) return res.status(400).send("Invalid amount for max players. Must be greater than 1");
            if (!req.session.user) return res.status(400).send("Please sign in");
            if (!address1) return res.status(400).send("Please enter the address");
            if (!city) return res.status(400).send("Please enter the city");
            if (!state) return res.status(400).send("Please enter the state");
            if (!zip) return res.status(400).send("Please enter the zip code");


            const creatorId = req.session.user.user_id;

            await db.query("call createnewevent($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)", [activityId, eventStart, eventEnd, isPublic, maxPlayers, creatorId, message, address1, address2, city, state, zip]);
            const [activityNameRes] = await db.query(`select activity_name from activities where activity_id = ${activityId}`);
            const activityName = activityNameRes.activity_name;
            const location = address1 + ' ' + address2 + ' ' + city + ' ' + state + ' ' + zip;

            res.send(`Event created: ${activityName} on ${eventStart} at ${location}`);
        } catch (error) {
            console.log(error)
            res.send(error);
        }
    },

    joinEvent: async (req, res) => {
        try {
            if (!req.session.user) return res.status(400).send('You are not signed in');
            if (!req.body.eventId) return res.status(400).send('Please select an event');
            const db = req.app.get('db');
            const userId = req.session.user.user_id;
            const eventId = req.body.eventId;

            await db.query("call joinEvent($1,$2)", [userId, eventId]);
            const [event] = await db.user_events_view.where('event_id = $1', [eventId]);

            if(event.current_player_count >= event.max_players) return res.status(400).send('Group is already full');
    
            const sqlResponse = 'You have successfully joined this event';
            res.send(sqlResponse);
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },

    unjoinEvent: async (req, res) => {
        try {
            if (!req.session.user) return res.status(400).send('You are not signed in');
            if (!req.query.event_id) return res.status(400).send('Please select an event');
            const db = req.app.get('db');
            const userId = req.session.user.user_id;
            const eventId = req.query.event_id;
            console.log(req);

            await db.query("call unjoinEvent($1,$2)", [userId, eventId]);

            res.send('You have successfully unjoined this event');
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },

    updateUser: async (req, res) => {
        try {
            const db = req.app.get('db');
            if (!req.session.user) return res.status(400).send('Please sign in');
            const userId = req.session.user.user_id;
            const { first_name, last_name, gender, email, phone_number, username, universal_distance } = req.body;

            if (gender !== null && gender !== "M" && gender !== "F") return res.status(400).send('Invalid gender. Please enter M, F or leave blank');
            if (email && !email.includes('@')) return res.status(400).send('Invalid email');

            await db.query("call updateUser($1,$2,$3,$4,$5,$6,$7,$8)", [userId, first_name, last_name, gender, email, phone_number, username, universal_distance]);

            res.send('Account successfully updated');
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },

    updateEvent: async (req, res) => {
        try {
            const db = req.app.get('db');
            if (!req.session.user) return res.status(400).send('Please sign in');
            const userId = req.session.user.user_id;
            const {
                activityId,
                eventStart,
                eventEnd,
                isPublic,
                maxPlayers,
                message,
                address1,
                address2,
                city,
                state,
                zip,
                eventId
            } = req.body;

            const [eventCreator] = await db.query(`select e.creator_id from events e where e.event_id = ${eventId}`)
            const creatorId = eventCreator.creator_id;

            if (userId !== creatorId) return res.status(400).send("You are not the creator of this event");

            let today = new Date();
            today = today.getTime();
            let eventDateStart;
            let eventDateEnd;

            if (eventStart) {
                eventDateStart = new Date(eventStart);
                eventDateStart = eventDateStart.getTime();
            }
            else eventDateStart = eventStart;

            if (eventEnd) {
                eventDateEnd = new Date(eventEnd);
                eventDateEnd = eventDateEnd.getTime();
            }
            else eventDateEnd = eventEnd;


            if (eventDateStart && eventDateStart < today) return res.status(400).send('Invalid date. Please select a future date');
            if (eventDateEnd && eventDateEnd < today) return res.status(400).send('Invalid date. Please select a future date');

            await db.query("call updateEvent($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)", [activityId, eventStart, eventEnd, isPublic, maxPlayers, message, address1, address2, city, state, zip, eventId]);

            res.send('Event successfully updated');
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },

    deleteEvent: async (req, res) => {
        try {
            if (!req.session.user) return res.status(400).send('Please sign in');

            const db = req.app.get("db");
            const eventId = req.params.event_id;

            if (!eventId) return res.status(400).send('Please select an event');

            const [event] = await db.events.where('event_id = $1', [eventId]);
            const creatorId = event.creator_id;

            if (req.session.user.user_id != creatorId) return res.status(400).send('You are not the creator');

            const deleteEventResponse = await db.query('call deleteEvent($1)', [eventId]);
            console.log(deleteEventResponse)

            res.send('Event deleted');
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },

    resetPassword: async (req, res) => {
        try {
            if (!req.session.user) return res.status(400).send('Please sign in');
            if (!req.body.newPassword) return res.status(400).send('Please enter a new password');
            if (!req.body.currentPassword) return res.status(400).send('Please enter your current password');

            const checkForNumber = (str) => {
                const numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                let containsNum = false;

                for (var i = 0; i < str.length; i++) {
                    if (str.includes(numArr[i])) {
                        containsNum = true;
                        return;
                    }
                }

                return containsNum;
            }

            const db = req.app.get("db");
            const userId = req.session.user.user_id;
            const {
                newPassword,
                currentPassword
            } = req.body;
            const hash = await bcrypt.hash(newPassword, 10);
            const [currentUser] = await db.users.where('user_id = $1', [userId]);
            const currentUserPassword = currentUser.user_password;
            const passwordsMatch = await bcrypt.compare(currentPassword, currentUserPassword);
            
            if(newPassword.length < 7) return res.status(400).send('Password Must Be At Least 7 Chatacters Long');
            if(checkForNumber(newPassword) === false) return res.status(400).send('Password Must Contain a Number');
            console.log('passwords, ', currentPassword, currentUserPassword, 'passmatch: ', passwordsMatch)
            if(passwordsMatch == false) return res.status(400).send('Current Password is Incorrect');
            
            await db.query('call resetPassword($1,$2)', [userId,hash]);

            res.send('Password successfully changed');
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },

    deleteAccount: async (req, res) => {
        try {
            if(!req.session.user) return res.status(400).send('Please sign in');
            const db = req.app.get("db");

            await db.query("call deleteUser($1)", [req.session.user.user_id]);
            req.session.destroy();
 
            res.send('Your account has been deleted');
        } catch (error) {
            console.log(error);            
            res.send(error);            
        }    

    }
}