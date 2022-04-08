const {needsParams} = require('./log')

let playersList = {}

const Players = (action) => {
    /**
     * @Params type: ação para o objeto, player: conexão do usuário. Exemplo: Players('create')({name: 'pablo', id: 1});
     */

    const createOrRemovePlayer = (player = {}, type) => {
        if(!type || !player.id || type === 'create' && !player.name) return needsParams('type', 'player.name', 'player.id')
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

    
    const playersActions = {
        actives: () => playersList,
        create: ({id, name}) => createOrRemovePlayer(createStruturePlayer({id, name}), 'create'),
        remove: ({id}) => createOrRemovePlayer({id}, 'remove'),
    }

    return playersActions[action] || playersActions.actives;
}

module.exports = { Players }
