const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const app = express()
require('dotenv').config();

const controller = require("./controller");


// massive({
//   host: "localhost",
//   port: 8080,
//   database: "postgres",
//   user: "postgres",
//   password: "Changeme"
// }).then(db => {
//   console.log("connected to db");
//   app.set("db", db);
// });

massive(process.env.DATABASE_URL).then(db => {
  app.set('db', db)
})
.catch(err => console.error(err))


app.use(express.static(path.join(__dirname, 'build')))

app.use(cors({
  credentials:true
}));

app.use(bodyParser.json());

app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);



app.get('*', (req,res) => {
  res.sendFile(path.join(_dirname, 'build','index.html'))
})

app.listen(process.env.PORT || 8080, function() {
  console.log(`listening on port:${this.address().port}`);



});
