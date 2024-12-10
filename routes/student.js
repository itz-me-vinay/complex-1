const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/students.json');

// Helper function to read student data
function getStudentData() {
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData);
}

// Helper function to save student data
function saveStudentData(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// GET all students
router.get('/', (req, res) => {
    const students = getStudentData();
    res.status(200).json(students);
});

// GET student by ID
router.get('/:id', (req, res) => {
    const students = getStudentData();
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (student) {
        res.status(200).json(student);
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});

// CREATE a new student
router.post('/', (req, res) => {
    const students = getStudentData();
    const newStudent = { id: students.length + 1, ...req.body };
    students.push(newStudent);
    saveStudentData(students);
    res.status(201).json(newStudent);
});

// UPDATE a student
router.put('/:id', (req, res) => {
    const students = getStudentData();
    const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));
    if (studentIndex !== -1) {
        students[studentIndex] = { id: parseInt(req.params.id), ...req.body };
        saveStudentData(students);
        res.status(200).json(students[studentIndex]);
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});

// DELETE a student
router.delete('/:id', (req, res) => {
    let students = getStudentData();
    const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));
    if (studentIndex !== -1) {
        students = students.filter(s => s.id !== parseInt(req.params.id));
        saveStudentData(students);
        res.status(200).json({ message: "Student deleted successfully" });
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});

module.exports = router;
