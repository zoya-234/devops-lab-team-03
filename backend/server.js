import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import mainRoutes from "./routes/mainRoutes.js";
import Registration from "./models/registration.js";

const app = express();
const PORT = 3333;

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to DB
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Public folder path
const publicPath = path.join(__dirname, '..', 'public');

// Serve static files (CSS, JS, images, HTML)
app.use(express.static(publicPath));

// Optional: explicitly serve CSS folder to ensure no conflicts
app.use('/css', express.static(path.join(publicPath, 'css')));

// HTML routes (optional if you want explicit routes)
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(publicPath, "register.html"));
});
app.get("/past-events", (req, res) => {
  res.sendFile(path.join(publicPath, "past-events.html"));
});
app.get("/schedule", (req, res) => {
  res.sendFile(path.join(publicPath, "schedule.html"));
});

app.post('/register', async (req, res) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();
    // redirect to schedule page
    res.redirect('/schedule');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  }
});



// Dynamic routes
app.use("/", mainRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));