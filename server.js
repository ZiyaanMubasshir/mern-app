const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/projects", (req, res) => {
    res.json([
        { name: "MERN Deployment Demo", technology: "MERN Stack" },
        { name: "Portfolio App", technology: "React" }
    ]);
});

app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(5000, () => {
            console.log("Server running on port 5000");
        });
    })
    .catch(err => {
        console.log("MongoDB connection failed:", err.message);
    });