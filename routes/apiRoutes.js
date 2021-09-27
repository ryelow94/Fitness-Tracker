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
  const allWorkouts = await Workout.find().sort({ day: 1 });
  res.json(allWorkouts);
});

router.post("/api/workouts", async (req, res) => {
  const createdWorkout = await Workout.create(req.body);
  res.json(createdWorkout);
});

router.get("/api/workouts/range", async (req, res) => {
  const weekAgo = getPreviousDate(7)
  const agg = Workout.aggregate([
    { $match: { day: { $gt: weekAgo } } },
    {
      $addFields: { totalDuration: { $sum: "$exercises.duration" } },
    },
  ]);
  res.json(agg)
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
