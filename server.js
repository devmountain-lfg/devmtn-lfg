const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const app = express();
require("dotenv").config();
const drewController = require("./controllers/drewController");
const paulController = require("./controllers/paulController");
const peterController = require("./controllers/peterController");
const taylorController = require("./controllers/taylorController");


massive(process.env.DATABASE_URL)
  .then(db => {
    console.log('heroku database connected')
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

app.get("/usersTest", drewController.getUsers);
app.get("/currentEvents", drewController.getCurrentEvents);
app.get("/me", (req, res) => {
  res.send(req.session.user);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "build", "index.html"));
});

app.post("/create-new-user", paulController.createNewUser);


app.listen(process.env.PORT || 8080, function() {
  console.log(`listening on port:${this.address().port}`);
});
