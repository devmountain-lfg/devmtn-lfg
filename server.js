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
const Chatkit = require("@pusher/chatkit-server");

const chatkit = new Chatkit.default({
  instanceLocator: "v1:us1:e2d98014-702f-4f97-9c50-067d5f18eafc",
  key:
    "246f89f5-f9a6-489f-a259-e9223238bac2:AnIcpJQ7u6cxH05w0Xt8S+OAten/AcL2D04r2Nmwk4s="
});

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

app.get("/event_by_id",peterController.getEventById)
app.get("/users_test", drewController.getUsers);
app.get("/current_events", drewController.getCurrentEvents);
app.get("/events_created", drewController.getMyCreatedEvents);
app.get("/events_joined", drewController.getJoinedEvents);
app.get("/events", drewController.getAllMyEvents);
app.get("/event", drewController.getChangeableEvent);
app.post("/login", drewController.login);
app.post("/create_user", paulController.createNewUser);
app.post("/create_event", paulController.createNewEvent);
app.get("/logout", drewController.logout);
app.post("/join_event", paulController.joinEvent);
app.delete("/unjoin_event", paulController.unjoinEvent);
app.delete("/event", drewController.deleteEvent);
app.put("/update_user", paulController.updateUser);
app.get("/activities", drewController.getActivities);
app.post("/filthy_filter", paulController.filthyFilter);
app.put("/update_event", paulController.updateEvent);
app.delete("/delete_event/:event_id", paulController.deleteEvent);
app.delete("/delete_account", paulController.deleteAccount);
app.get("/me", (req, res) => {
  res.send(req.session.user);
});

app.post("/user_chat", (req, res) => {
  const { username } = req.body;
  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error === "services/chatkit/user_already_exists") {
        res.sendStatus(200);
      } else {
        res.status(error.status).json(error);
      }
    });
});

app.post("/authenticate_chat", (req, res) => {
  const { grant_type } = req.body;
  res.json(chatkit.authenticate({ grant_type, userId: req.query.user_id }));
});

app.get("/chat_room", (req, res) => {
  const roomId = req.query.roomId;
  chatkit.getRoom({
    roomId: `${roomId}`,
  }).then((room) => {
    res.status(200).send(room)
  }).catch((err) => {
    console.log(err)
  })
})

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.listen(process.env.PORT || 8080, function() {
  console.log(`listening on port:${this.address().port}`);
});
