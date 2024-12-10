const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/student');

const app = express();
const PORT = 3000;

app.use(bodyParser.json()); // Parse JSON bodies
app.use('/api/students', studentRoutes); // Use student routes

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
