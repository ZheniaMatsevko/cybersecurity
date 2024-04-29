const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the dom-based directory
app.use(express.static(path.join(__dirname, 'xss', 'dom-based')));

// Route to serve the input page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'start-page.html'));
});

// Route to serve the search results page
app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'index-secure.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
