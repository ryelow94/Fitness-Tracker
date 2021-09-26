const path = require("path");

module.exports = function (app) {
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/exercise.html"));
  });

  app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/exercise.html"));
  });

  // GET Route for feedback page
  app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/stats.html"));
  });
};
