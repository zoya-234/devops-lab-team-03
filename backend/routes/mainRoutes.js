import express from "express";
import Registration from "../models/registration.js";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..", "public");

// Home page
router.get("/", (req, res) => {
  res.sendFile(path.join(rootDir, "index.html"));
});

// Register form page
router.get("/register", (req, res) => {
  res.sendFile(path.join(rootDir, "register.html"));
});

// Past events page
router.get("/past-events", (req, res) => {
  res.sendFile(path.join(rootDir, "past-events.html"));
});

// Handle form submission
router.post("/register", async (req, res) => {
  try {
    const newUser = new Registration(req.body);
    await newUser.save();
    res.redirect("/schedule");
  } catch (err) {
    console.error("Error saving registration:", err);
    res.status(500).send("Something went wrong.");
  }
});

// Schedule (thank you) page
router.get("/schedule", (req, res) => {
  res.sendFile(path.join(rootDir, "schedule.html"));
});

export default router;
