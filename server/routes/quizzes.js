import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();


// GET all quizzes
router.get("/", async (req, res) => {
  try {
    let collection = await db.collection("quizzes");
    let results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching quizzes");
  }
});


// GET quiz by ID
router.get("/:id", async (req, res) => {
  try {
    let collection = await db.collection("quizzes");
    let query = { _id: new ObjectId(req.params.id) };

    let result = await collection.findOne(query);

    if (!result) {
      res.status(404).send("Quiz not found");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching quiz");
  }
});


// CREATE new quiz
router.post("/", async (req, res) => {
  try {
    let newQuiz = {
      course_id: req.body.course_id,
      title: req.body.title,
      questions: req.body.questions,
      created_by: req.body.created_by,
      created_at: new Date(),
    };

    let collection = await db.collection("quizzes");
    let result = await collection.insertOne(newQuiz);

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating quiz");
  }
});


// UPDATE quiz
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const updates = {
      $set: {
        title: req.body.title,
        questions: req.body.questions,
      },
    };

    let collection = await db.collection("quizzes");
    let result = await collection.updateOne(query, updates);

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating quiz");
  }
});


// DELETE quiz
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("quizzes");
    let result = await collection.deleteOne(query);

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting quiz");
  }
});

export default router;