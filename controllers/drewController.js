module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password)
        return res.status(400).send("Please enter username and password");

      const db = req.app.get("db");

      const [user] = await db.users.where("email=$1 OR username=$1", [
        req.body.username
      ]);
      console.log(user);

      if (!user)
        return res
          .status(400)
          .send(
            "The user does not exist. Please enter a valid email and password"
          );
      let authenticated = false;
      if (user.user_password === password) {
        authenticated = true;
      }

      if (authenticated === false) {
        return res.status(400).send("Please authenticate!");
      } else {
        req.session.user = user;
      }
      delete user.password;

      console.log("here is user", user);
      return res.status(200).send(user);
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

  getMyEvents: async (req, res) => {
    try {
    const user_id = req.params.id;
    const db = req.app.get("db");
    const query = `SELECT * FROM user_events_view u WHERE u.user_id = ${user_id};`;

    const results = await db.query(query);
      res.status(200).send(results);
    } catch (err) {
      res.status(500).send(err);
      console.log(`here is error: ${err}`);
    }
  }
};
