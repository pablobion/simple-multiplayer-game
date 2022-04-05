const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {Players} = require('./context/server')
const {log} = require('./context/log')

const app = express();
let server = http.Server(app);
let io = socketIO(server, {
    pingTimeout: 60000,
});


app.use('/static', express.static(__dirname + '/static'))
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, 'index.html'))
})


const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

io.on('connection', (socket) => {
    log({message: `${socket.id} connected`})
    console.log('entrou')
})


