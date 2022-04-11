const {log} = require('../context/log')
const {Players} = require('../context/players')

const connections = (io) => {
    io.on('connection', (socket) => {
        console.log(log({message: `User: ${socket.id} connected`}))
        const playerCreated = Players('create')({name: 'pablo', id: socket.id})

        socket.emit("currentPlayers", Players('actives')());
        io.emit("playerSays", Players('get')(socket.id))

        socket.broadcast.emit('newPlayerConnected', playerCreated);

        socket.on('disconnect', () => {
            console.log(log({message: `User: ${socket.id} disconnected`}))
            Players('remove')({id: socket.id})
            io.emit("playerDisconnected", socket.id)
        })
    })
}

module.exports = {connections}