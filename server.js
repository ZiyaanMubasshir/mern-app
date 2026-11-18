const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Project Schema
const projectSchema = new mongoose.Schema({
    title: String,
    stack: String,
    rating: Number
}, {
    timestamps: true
});

// Project Model
const Project = mongoose.model("Project", projectSchema);

// Get projects from MongoDB
app.get("/api/projects", async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("MongoDB connected");

        const projectExists = await Project.findOne({
            title: "Result Portal"
        });

        if (!projectExists) {
            await Project.create({
                title: "Result Portal",
                stack: "PHP, MySQL",
                rating: 3
            });

            console.log("Result Portal added");
        }

        app.listen(5000, () => {
            console.log("Server running on port 5000");
        });
    })
    .catch(err => {
        console.log("MongoDB connection failed:", err.message);
    });