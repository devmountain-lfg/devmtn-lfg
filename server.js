require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const app = express();
const drewController = require("./controllers/drewController");
const paulController = require("./controllers/paulController");
const peterController = require("./controllers/peterController");
const taylorController = require("./controllers/taylorController");

massive(process.env.DATABASE_URL)
  .then(db => {
    console.log("heroku database connected");
    app.set("db", db);
  })
  .catch(err => console.error(err));

app.use(express.static(path.join(__dirname, "build")));

app.use(
  cors({
    credentials: true
  })
);

app.use(bodyParser.json());

app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);

app.get("/users_test", drewController.getUsers);
app.get("/current_events", drewController.getCurrentEvents);
app.get("/events:id", drewController.getMyEvents);
app.post("/login", drewController.login);
app.post("create_user", paulController.createNewUser);
app.post("/create_event", paulController.createNewEvent);
app.get("/logout", drewController.logout);
app.get("/me", (req, res) => {
  res.send(req.session.user);
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });




app.listen(process.env.PORT || 8080, function() {
  console.log(`listening on port:${this.address().port}`);
});
