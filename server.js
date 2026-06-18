require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected securely to MongoDB"))
    .catch(err => console.error("Database connection error:", err));

// Define Project Schema & Model
const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    link: String
});
const Project = mongoose.model('Project', projectSchema);

// API Route: Get all projects
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API Route: Add a new project (To populate your database)
app.post('/api/projects', async (req, res) => {
    const project = new Project({
        title: req.body.title,
        description: req.body.description,
        link: req.body.link
    });
    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));