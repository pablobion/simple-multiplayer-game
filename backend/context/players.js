const {needsParams} = require('./log')

let playersList = {}

const Players = (action) => {
    /**
     * @Params type: ação para o objeto, player: conexão do usuário. Exemplo: Players('create')({name: 'pablo', id: 1});
     */

    const createOrRemovePlayer = (player = {}, type = '') => {
        if(!type || !player.id || type === 'create' && !player.name) return needsParams('type', 'player.name', 'player.id');
        type === 'create' ? playersList[player.id] = player : delete playersList[player.id];
        return playersList[player.id];
    } 

    const createStruturePlayer = ({id, name}) => {
        return {
            id,
            name,
            x: Math.floor(Math.random() *100)+400,
            y: Math.floor(Math.random() *500),
            direction: 'right',
            speed: 1,
            isMoving: false,
            isShooting: false,
            isDead: false,  
        }
    }

    const findPlayer = (id) => {
        return playersList[id];
    } 

    const playerMovement = ({playerId, direction}) => {
        if(!playerId || !direction) return needsParams('playerId', 'direction');
        const player = findPlayer(playerId);

        const pixels = 10;
        
        const move = {
            up: () => player.y -= pixels,
            down: () => player.y += pixels,
            left: () => player.x -= pixels,
            right: () => player.x += pixels
        };

        move[direction]();

        return playersList[player.id];
    }

    
    const playersActions = {
        actives: () => playersList,
        create: ({id, name}) => createOrRemovePlayer(createStruturePlayer({id, name}), 'create'),
        remove: ({id}) => createOrRemovePlayer({id}, 'remove'),
        get: (id) => playersList[id],
        move: (playerId, direction) => playerMovement({playerId, direction}),

    }

    return playersActions[action] || playersActions.actives;
}

module.exports = { Players }
