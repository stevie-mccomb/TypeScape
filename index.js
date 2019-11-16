require('dotenv').config();
if (!process.env.PORT) process.env.PORT = 3000;

const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.use(express.static('public'));

server.listen(process.env.PORT, () => {
    console.log(`Listening on *:${process.env.PORT}...`);
});
