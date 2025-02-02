import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import userroutes from "./routes/user.js";
import questionroutes from "./routes/question.js";
import answerroutes from "./routes/answer.js";

dotenv.config();

const app = express();

// Serve static files (like avatar images) from the "uploads" folder
app.use("/uploads", express.static(path.resolve("uploads"))); // This serves files from the uploads folder

// Middleware to parse incoming requests
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Routes
app.use("/user", userroutes);
app.use("/questions", questionroutes);
app.use("/answer", answerroutes);

// Test route
app.get("/", (req, res) => {
  res.send("Codequest is running perfectly");
});

// Load environment variables
const PORT = process.env.PORT || 5000;
const database_url = process.env.MONGODB_URL;

// Connect to MongoDB
mongoose.connect(database_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => {
    console.log("MongoDB connection error: ", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });
