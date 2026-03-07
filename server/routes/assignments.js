import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();


// GET all assignments
router.get("/", async (req, res) => {
  try {
    let collection = await db.collection("assignments");
    let results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching assignments");
  }
});


// GET assignment by ID
router.get("/:id", async (req, res) => {
  try {
    let collection = await db.collection("assignments");
    let query = { _id: new ObjectId(req.params.id) };

    let result = await collection.findOne(query);

    if (!result) {
      res.status(404).send("Assignment not found");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching assignment");
  }
});


// CREATE new assignment
router.post("/", async (req, res) => {
  try {
    let newAssignment = {
      title: req.body.title,
      description: req.body.description,
      course_id: req.body.course_id,
      due_date: req.body.due_date,
      created_at: new Date(),
    };

    let collection = await db.collection("assignments");
    let result = await collection.insertOne(newAssignment);

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating assignment");
  }
});


// UPDATE assignment
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const updates = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        due_date: req.body.due_date,
      },
    };

    let collection = await db.collection("assignments");
    let result = await collection.updateOne(query, updates);

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating assignment");
  }
});


// DELETE assignment
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("assignments");
    let result = await collection.deleteOne(query);

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting assignment");
  }
});

export default router;