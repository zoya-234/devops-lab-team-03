import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import mainRoutes from "./routes/mainRoutes.js";

const app = express();
const PORT = 3333;

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup
connectDB();
app.use(bodyParser.urlencoded({ extended: true }));

// If your public folder is a sibling of backend folder
const publicPath = path.join(__dirname, '..', 'public'); 
app.use(express.static(publicPath));


app.get("/register", (req, res) => {
  res.sendFile(path.join(publicPath, "register.html"));
});

app.get("/past-events", (req, res) => {
  res.sendFile(path.join(publicPath, "past-events.html"));
});

app.get("/schedule", (req, res) => {
  res.sendFile(path.join(publicPath, "schedule.html"));
});

// Routes
app.use("/", mainRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
