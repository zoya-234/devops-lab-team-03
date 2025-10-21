import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import mainRoutes from "./routes/mainRoutes.js";
import Registration from "./models/registration.js";

const app = express();
const PORT = 3333;

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Public folder path
const publicPath = path.join(__dirname, '..', 'public');

// Serve static files
app.use(express.static(publicPath));
app.use('/css', express.static(path.join(publicPath, 'css')));

// HTML routes
app.get("/", (req, res) => res.sendFile(path.join(publicPath, "index.html")));
app.get("/register", (req, res) => res.sendFile(path.join(publicPath, "register.html")));
app.get("/past-events", (req, res) => res.sendFile(path.join(publicPath, "past-events.html")));
app.get("/schedule", (req, res) => res.sendFile(path.join(publicPath, "schedule.html")));

// Registration route
app.post('/register', async (req, res) => {
  try {
    const { name, email, phone, eventName } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !eventName) {
      return res.status(400).send("All fields are required");
    }

    // Check if already registered for this event
    const existingRegistration = await Registration.findOne({ email, eventName });
    if (existingRegistration) {
      return res.status(400).send("You are already registered for this event");
    }

    // Save registration
    const registration = new Registration({ name, email, phone, eventName });
    await registration.save();

    // Redirect to schedule page with success query param
    res.redirect('/schedule?status=success');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  }
});

// Dynamic routes
app.use("/", mainRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
