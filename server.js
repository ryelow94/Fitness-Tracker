const express = require('express')
const logger = require("morgan")
const mongoose = require('mongoose');
//require("dotenv").config()

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { 
  useNewUrlParser: true,
  useFindAndModify: false,
});
// .then((result) => console.log("connected to mongo db"))

const db = require("./models");

app.use(require("./routes/apiRoutes"));
app.use(require("./routes/htmlRoutes"));

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);