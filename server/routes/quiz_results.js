import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

const collectionName = "quiz_results";
const collection = db.collection(collectionName);


// GET all quiz results
router.get("/", async (req, res) => {
  try {
    let results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    res.status(500).send("Error fetching quiz results");
  }
});


// GET quiz result by ID
router.get("/:id", async (req, res) => {
  try {
    let result = await collection.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!result) {
      res.status(404).send("Quiz result not found");
      return;
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error fetching quiz result");
  }
});


// CREATE quiz result
router.post("/", async (req, res) => {
  try {
    let newResult = {
      quiz_id: req.body.quiz_id,
      student_id: req.body.student_id,
      score: req.body.score,
      total_questions: req.body.total_questions,
      submitted_at: new Date(),
    };

    let result = await collection.insertOne(newResult);

    res.status(201).send(result);
  } catch (err) {
    res.status(500).send("Error creating quiz result");
  }
});


// UPDATE quiz result
router.put("/:id", async (req, res) => {
  try {
    let result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          score: req.body.score,
          total_questions: req.body.total_questions,
        },
      }
    );

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error updating quiz result");
  }
});


// DELETE quiz result
router.delete("/:id", async (req, res) => {
  try {
    let result = await collection.deleteOne({
      _id: new ObjectId(req.params.id),
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error deleting quiz result");
  }
});

export default router;