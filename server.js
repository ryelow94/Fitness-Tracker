const express = require('express')
const logger = require("morgan")
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness-tracker", { useNewUrlParser: true });

const db = require("./models");

require("./routes/apiRoutes")(app);
app.use(require("./routes/htmlRoutes"))

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);