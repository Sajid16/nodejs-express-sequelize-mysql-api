const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./app/models");
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });


var corsOptions = {
  origin: ["http://localhost:4200"]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Node.js and sequelize application."
  });
});

require("./app/routes/turorial.routes")(app);
require("./app/routes/test.routes")(app);

// upload file using node and sequilize

let router = require('./app/routes/file.routes');
app.use('/', router);

// /////////////////////////////////////////////

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
