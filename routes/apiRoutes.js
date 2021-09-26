const db = require("../models");
const { Workout } = require("../models/workout");

module.exports = (app) => {

// app.get("/api/workouts", (req, res) => {
//     db.Workout.find({})
//       .then(workout => {
//         res.json(workout);
//       })
//       .catch(err => {
//         res.json(err);
//       });
//   });

  app.get("/api/workouts", async (req,res) => {
    const allWorkouts = await Workout.find().sort({day: 1})
    res.json(allWorkouts)
  })

  app.post("/api/workouts", async (req,res) => {
   const createdWorkout = await Workout.create(req.body)
   res.json(createdWorkout)
  })

  // app.get("/api/workouts/range", async (req, res) => {
  //   const today = new Date()
  //   const weekAgo = today.(weekago.setDate()-7);
  //   Workout.aggregate([
  //     {$match: {day: {$gt:}}}
  //   ])
  // })

  app.put("api/workouts/:id", async (req,res) => {
    Workout.updateOne({ _id: req.params.id }, {$push: {
      exercises:req.body} })
      res.statusCode(200).end()
  })
}