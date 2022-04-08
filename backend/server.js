const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const cors = require('cors')
const {connections} = require('./socket/index')
const {Players} = require('./context/players')


const app = express();
app.use(cors())

let server = http.Server(app);
let io = socketIO(server, {
    cors: {
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    }
});

app.get('/players', (req, res) => {
    res.json( Players('actives')())
})

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


connections(io)


module.exports = {io}
