const {Players} = require('../../context/players')


const pressKeyDown = ({socket, io}) => {

    const movementKeys = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
        up: 'up',
        down: 'down',
        left: 'left',
        right: 'right',
    }

    socket.on('playerPressKeyDown', ({event, key}) => {
        if(movementKeys[key]){
            const player = Players('move')(socket.id, movementKeys[key])
            if(!player) return
            io.emit('playerMoved', {
                x: player.x,
                y: player.y,
                id: player.id,
                moveDirection: movementKeys[key]
            })
        }
    })
}

module.exports = {pressKeyDown}