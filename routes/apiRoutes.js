const db = require("../models");
const { Workout } = require("../models/workout");
const express = require("express");
const router = express.Router()

  router.get("/api/workouts", async (req,res) => {
    const allWorkouts = await Workout.find().sort({day: 1})
    res.json(allWorkouts)
  })

  router.post("/api/workouts", async (req,res) => {
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

  router.put("/api/workouts/:id", async (req,res) => {
    Workout.updateOne({ _id: req.params.id }, {$push: {
      exercises:req.body} })
      res.status(200).end()
  })
module.exports = router