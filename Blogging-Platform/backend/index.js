require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// MongoDB Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

connectToDB();
