const {log} = require('../context/log')
const {Players} = require('../context/players')

const connections = (io) => {
    io.on('connection', (socket) => {
        console.log(log({message: `User: ${socket.id} connected`}))
        Players('create')({name: 'pablo', id: socket.id})
        console.log(Players('actives')())

        socket.on('disconnect', () => {
            console.log(log({message: `User: ${socket.id} disconnected`}))
            Players('remove')({id: socket.id})
            console.log(Players('actives')())
        })
    })
}

module.exports = {connections}