const express = require("express");
const bcrypt = require("bcrypt");

module.exports = {


  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).send("Please enter email and password");

      const db = req.app.get("db");

      const [user] = await db.users.find({ email });

      if (!user)
        return res
          .status(400)
          .send(
            "The user does not exist. Please enter a valid email and password"
          );

      const authenticated = await bcrypt.compare(password, user.password);
      console.log(authenticated);

      if (!authenticated) {
        return res.status(400).send("Please authenticate!");
      }
      delete user.password;

      req.session.user = user;
      console.log("here is user", user);
      return res.status(200).send(user);
    } catch (error) {
      console.log(error);
    }
  },

  logout: (req, res) => {
    return req.session.destroy(err => res.send("Successfully logged out"));
  },

};
