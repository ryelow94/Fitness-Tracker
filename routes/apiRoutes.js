const db = require("../models");
const Workout = require("../models/workout");
const express = require("express");
const router = express.Router();

const getPreviousDate = (offset) => {
  const date = new Date();
  date.setDate(date.getDate()-offset);
  return date;
}

router.get("/api/workouts", async (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ])
  .then((dbWorkouts) => {
    res.json(dbWorkouts);
  }).catch((err) => {res.json(err)});
});

router.post("/api/workouts", async (req, res) => {
  const createdWorkout = await Workout.create(req.body);
  res.json(createdWorkout);
});

router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([
    { 
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ]).sort({_id: -1})
    .limit(7)
    .then((dbWorkouts) => {
      console.log(dbWorkouts);
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    })
});

router.put("/api/workouts/:id", async (req, res) => {
  const updatedWorkout = await Workout.updateOne(
    { _id: req.params.id },
    {
      $push: {
        exercises: req.body,
      },
    }
  );
  console.log(req.body);
  res.json(updatedWorkout);
  // res.status(200).end()
});
module.exports = router;
