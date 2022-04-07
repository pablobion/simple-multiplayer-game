const {needsParams} = require('./log')

let playersList = {}

const Players = (action) => {
    /**
     * @Params type: ação para o objeto, player: conexão do usuário. Exemplo: Players('create')({name: 'pablo', id: 1});
     */

    const createOrRemovePlayer = (player = {}, type) => {
        if(!type || !player.id || type === 'create' && !player.name) return needsParams('type', 'player.name', 'player.id')
        type === 'create' ? playersList[player.id] = player : delete playersList[player.id];
        return `${type} player: ${player.name} id: ${player.id}`;
    } 

    const createStruturePlayer = ({id, name}) => {
        return {
            id,
            name,
            x: 30,
            y: 30,
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
