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

server.get('/', (req, res) => {
    res.sendFile(__dirname+ '/index.html');
});
server.post('/submit-comment', (req, res) => {
    const { comment } = req.body;

    let comments = [];
    try {
        comments = JSON.parse(fs.readFileSync(COMMENTS_FILE, 'utf8'));
    } catch (err) {
        console.error('Error reading comments file:', err);
    }

    comments.push(comment);

    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments), (err) => {
        if (err) {
            console.error('Error writing comments to file:', err);
            return res.status(500).send('Error saving comment.');
        }
        res.redirect('/all-comments');
    });
});

server.get('/all-comments', (req, res) => {

    let comments = [];
    try {
        comments = JSON.parse(fs.readFileSync(COMMENTS_FILE, 'utf8'));
    } catch (err) {
        console.error('Error reading comments file:', err);
    }
    let obj = {
        content:comments
    };

    res.render(__dirname+"/comments.twig",obj);
});

server.listen(3001);
console.log('Server is running on port 3001');
