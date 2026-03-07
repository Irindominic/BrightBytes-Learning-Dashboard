import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();


// GET all submissions
router.get("/", async (req, res) => {
  try {
    let collection = await db.collection("submissions");
    let results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching submissions");
  }
});


// GET submission by ID
router.get("/:id", async (req, res) => {
  try {
    let collection = await db.collection("submissions");
    let query = { _id: new ObjectId(req.params.id) };

    let result = await collection.findOne(query);

    if (!result) {
      res.status(404).send("Submission not found");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching submission");
  }
});


// CREATE new submission
router.post("/", async (req, res) => {
  try {
    let newSubmission = {
      assignment_id: req.body.assignment_id,
      student_id: req.body.student_id,
      submission_text: req.body.submission_text,
      file_url: req.body.file_url,
      marks: null,
      feedback: "",
      submitted_at: new Date(),
    };

    let collection = await db.collection("submissions");
    let result = await collection.insertOne(newSubmission);

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating submission");
  }
});


// UPDATE submission (for marks and feedback)
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const updates = {
      $set: {
        marks: req.body.marks,
        feedback: req.body.feedback,
      },
    };

    let collection = await db.collection("submissions");
    let result = await collection.updateOne(query, updates);

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating submission");
  }
});


// DELETE submission
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("submissions");
    let result = await collection.deleteOne(query);

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting submission");
  }
});

export default router;