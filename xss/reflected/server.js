"use strict";
let http = require('http');
let express = require('express');

let server=express();
server.listen(3000);
console.log('Server is running on port 3000');


server.use(express.static(__dirname));

server.get('/', function(req, res){
    res.sendFile(__dirname+"/index.html");
});

server.get('/reply', function(req, res){

    const input = req.query.data;
    res.send(`<!DOCTYPE html>
<html lang="es-ES"><body>
<p>Searched query: ${input}</p>
</body></html>`);
});