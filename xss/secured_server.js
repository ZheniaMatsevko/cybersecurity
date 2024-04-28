"use strict";
let http = require('http');
let express = require('express');
let helmet = require('helmet');

let server=express();
server.use(helmet());
server.listen(8888);
console.log('Server is running on port 8888');


server.use(express.static(__dirname));

server.get('/', function(req, res){
    console.log("Під'єднання від дорогоцінного клієнта!");
    res.sendFile(__dirname+"/index.html");
});

server.get('/reply', function(req, res){
    console.log("Отримано запит від форми");
    console.log("Введене число - "+req.query.data);
    const searchQuery = req.query.data;
    res.send(`<!DOCTYPE html>
<html lang="es-ES"><body>
<p>Searched query: ${searchQuery}</p>
</body></html>`);
});