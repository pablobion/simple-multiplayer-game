const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const cors = require('cors')
const {connections} = require('./socket/index')


const app = express();
app.use(cors())

let server = http.Server(app);
let io = socketIO(server, {
    pingTimeout: 60000,
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});



connections(io)


module.exports = {io}
