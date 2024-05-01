const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'xss', 'dom-based')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'start-page.html'));
});

app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'index-secure.html'));
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
