import express from "express";

// Database connection
import db from "../db/connection.js";

// Convert string id to ObjectId
import { ObjectId } from "mongodb";

const router = express.Router();


// GET all users
router.get("/", async (req, res) => {
  let collection = await db.collection("users");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});


// GET single user by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("users");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("User not found").status(404);
  else res.send(result).status(200);
});


// CREATE new user
router.post("/", async (req, res) => {
  try {
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role, // coordinator / educator / learner
      theme: req.body.theme, // 'light' | 'dark' (optional)
      courses_enrolled: [],
      created_at: new Date(),
    };

    let collection = await db.collection("users");
    let result = await collection.insertOne(newUser);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user");
  }
});


// UPDATE user
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const $set = {};

    if (req.body.name !== undefined) $set.name = req.body.name;
    if (req.body.email !== undefined) $set.email = req.body.email;
    if (req.body.role !== undefined) $set.role = req.body.role;
    if (req.body.password !== undefined) $set.password = req.body.password;
    if (req.body.courses_enrolled !== undefined) $set.courses_enrolled = req.body.courses_enrolled;
    if (req.body.theme !== undefined) $set.theme = req.body.theme;

    const updates = Object.keys($set).length ? { $set } : {};

    let collection = await db.collection("users");
    if (Object.keys(updates).length === 0) {
      const doc = await collection.findOne(query);
      return res.send(doc).status(200);
    }
    await collection.updateOne(query, updates);
    const updated = await collection.findOne(query);
    res.send(updated).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating user");
  }
});


// DELETE user
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("users");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting user");
  }
});

export default router;
