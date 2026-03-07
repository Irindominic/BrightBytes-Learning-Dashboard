import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();


// GET all courses
router.get("/", async (req, res) => {
  try {
    let collection = await db.collection("courses");
    let results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching courses");
  }
});


// GET a single course by ID
router.get("/:id", async (req, res) => {
  try {
    let collection = await db.collection("courses");
    let query = { _id: new ObjectId(req.params.id) };

    let result = await collection.findOne(query);

    if (!result) {
      res.status(404).send("Course not found");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching course");
  }
});


// CREATE a new course
router.post("/", async (req, res) => {
  try {
    let newCourse = {
      title: req.body.title,
      description: req.body.description,
      educator_id: req.body.educator_id,
      students: [],
      study_plan: [],
      created_at: new Date(),
    };

    let collection = await db.collection("courses");
    let result = await collection.insertOne(newCourse);

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating course");
  }
});


// UPDATE course
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const setFields = {};
    if (req.body.title !== undefined) setFields.title = req.body.title;
    if (req.body.description !== undefined) setFields.description = req.body.description;
    if (req.body.study_plan !== undefined) setFields.study_plan = req.body.study_plan;
    const updates = Object.keys(setFields).length ? { $set: setFields } : {};

    let collection = await db.collection("courses");
    let result = await collection.updateOne(query, updates);

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating course");
  }
});


// DELETE course
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("courses");
    let result = await collection.deleteOne(query);

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting course");
  }
});

export default router;