import express from "express";
import Registration from "../models/registration.js";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..", "public");

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

export default router;
