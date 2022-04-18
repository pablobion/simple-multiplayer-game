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
        console.log('slc')
        if(movementKeys[key]){
            const {x,y,id} = Players('move')(socket.id, movementKeys[key])
            io.emit('playerMoved', {x,y,id})
        }
    })
}

module.exports = {pressKeyDown}