const {log} = require('../context/log')
const {Players} = require('../context/players')
const {pressKeyDown} = require("./scripts/pressKeyDown")

const connections = (io) => {
    
    io.on('connection', (socket) => {
        console.log(log({message: `User: ${socket.id} connected`}))
        pressKeyDown({socket, io})

        const playerCreated = Players('create')({name: socket.id, id: socket.id})
        socket.broadcast.emit('newPlayerConnected', playerCreated);

        socket.emit("currentPlayers", Players('actives')());
        //io.emit("playerSays", Players('get')(socket.id))


        socket.on('disconnect', () => {
            console.log(log({message: `User: ${socket.id} disconnected`}))
            Players('remove')({id: socket.id})
            io.emit("playerDisconnected", socket.id)
        })
    })
}

module.exports = {connections}