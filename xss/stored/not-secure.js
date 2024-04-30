const http = require('http');
const express = require('express');
const fs = require('fs');
const twig = require('twig');
const COMMENTS_FILE = (__dirname+ '/comments.json');
const server=express();

server.use(express.static(__dirname));
server.use(express.urlencoded({ extended: true }));
server.set('view engine','twig');
server.set('views', '.');
// Route for the main page with the form to submit comments
server.get('/', (req, res) => {
    res.sendFile(__dirname+ '/index.html');
});
server.post('/submit-comment', (req, res) => {
    const { comment } = req.body;

    // Load existing comments from file
    let comments = [];
    try {
        comments = JSON.parse(fs.readFileSync(COMMENTS_FILE, 'utf8'));
    } catch (err) {
        console.error('Error reading comments file:', err);
    }

    // Add new comment to the list
    comments.push(comment);

    // Save updated comments to file
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments), (err) => {
        if (err) {
            console.error('Error writing comments to file:', err);
            return res.status(500).send('Error saving comment.');
        }
        res.redirect('/all-comments');
    });
});

server.get('/all-comments', (req, res) => {
    // Load comments from file
    let comments = [];
    try {
        comments = JSON.parse(fs.readFileSync(COMMENTS_FILE, 'utf8'));
    } catch (err) {
        console.error('Error reading comments file:', err);
    }
    let obj = {
        content:comments
    };
    // Render the page with all comments
    res.render(__dirname+"/comments.twig",obj);
});
server.listen(8888);
console.log('Server is running on port 8888');
