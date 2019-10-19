const bcrypt = require("bcrypt");

module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password)
        return res.status(400).send("Please enter username and password");

      const db = req.app.get("db");

      const [user] = await db.users.where(
        "LOWER(email)=$1 OR LOWER(username)=$1",
        [req.body.username.toLowerCase()]
      );
      console.log(user);

      if (!user)
        return res
          .status(400)
          .send(
            "The user does not exist. Please enter a valid email and password"
          );

      const authenticated = await bcrypt.compare(password, user.user_password);

      if (authenticated === false) {
        return res.status(400).send("Incorrect username or password!");
      } else {
        req.session.user = user;
      }
      delete user.password;

      console.log("here is user", user);
      return res.status(200).send(`Welcome ${user.first_name}`);
    } catch (error) {
      console.log(error);
    }
  },

  logout: (req, res) => {
    return req.session.destroy(err => res.send("Successfully logged out"));
  },

  getUsers: (req, res) => {
    const db = req.app.get("db");
    db.query(`SELECT * FROM users`)
      .then(result => {
        console.log(result);
        res.status(200).send(result);
      })
      .catch(err => {
        console.log(err);
      });
  },

  getCurrentEvents: async (req, res) => {
    try {
      const db = req.app.get("db");
      const query = `SELECT * FROM current_events_view`;
      const results = await db.query(query);
      res.status(200).send(results);
    } catch (err) {
      console.log(err);
      res.status(500).send(`Here is error: ${err}`);
    }
  },

  getMyCreatedEvents: async (req, res) => {
    try {
      const user_id = req.session.user.user_id;
      const db = req.app.get("db");
      const query = `SELECT * FROM user_events_view u WHERE u.creator_id = ${user_id};`;

      const results = await db.query(query);
      res.status(200).send(results);
    } catch (err) {
      res.status(500).send(err);
      console.log(`here is error: ${err}`);
    }
  },

  getJoinedEvents: async (req, res) => {
    try {
      const user_id = req.query.user_id;
      const db = req.app.get("db");
      const query = `SELECT * FROM user_events_view u WHERE u.user_id = ${user_id};`;

      const results = await db.query(query);
      res.status(200).send(results);
    } catch (err) {
      res.status(500).send(err);
      console.log(`here is error: ${err}`);
    }
  },

  getAllMyEvents: async (req, res) => {
    try {
      const user_id = req.query.user_id;
      console.log("this is req", req);
      const db = req.app.get("db");
      const query = `SELECT * FROM user_events_view u WHERE u.user_id = ${user_id} OR u.creator_id = ${user_id};`;

      const results = await db.query(query);
      res.status(200).send(results);
    } catch (err) {
      res.status(500).send(err);
      console.log(`here is error: ${err}`);
    }
  },

  getChangeableEvent: async (req, res) => {
    try {
      const event_id = req.query.event_id;
      const db = req.app.get("db");
      const query = `WITH events AS 
      (
      SELECT * FROM events WHERE event_id = ${event_id}
      ),
      activity_name AS
      (
      SELECT activity_id, activity_name FROM activities
      )
      SELECT * FROM events events JOIN ( SELECT * FROM activity_name ) activities ON events.event_id = activities.activity_id;`;
      const results = await db.query(query);
      res.status(200).send(results);
    } catch (err) {
      res.status(500).send(err);
      console.log(`here is error: ${err}`);
    }
  },

  getActivities: async (req, res) => {
    try {
      const db = req.app.get("db");
      const query = "SELECT * FROM activities";
      const results = await db.query(query);
      res.status(200).send(results);
    } catch (err) {
      console.log(err);
      res.status(500).send(`Here is error: ${err}`);
    }
  },

  deleteEvent: async (req, res) => {
    try {
      const event_id = req.query.event_id;
      const db = req.app.get("db");
      const query = `DELETE from events WHERE event_id = ${event_id}`;
      const results = await db.query(query);
      res.status(200).send(results);
    } catch (err) {
      console.log(err);
      res.status(500).send(`Here is error: ${err}`);
    }
  },
};
