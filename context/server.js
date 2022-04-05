const {needsParams} = require('./log')

let playersList = {}

const Players = (action) => {
    /**
     * @Params type: ação para o objeto, player: conexão do usuário. Exemplo: Players('create')({name: 'pablo', id: 1});
     */

    const createOrRemovePlayer = (player = {}, type) => {
        if(!type || !player.id || !player.name) return needsParams('type', 'player.name', 'player.id')
        type === 'create' ? playersList[player.id] = player : delete playersList[player.id];
        return `${type} player: ${player.name} id: ${player.id}`;
    } 

    const playersActions = {
        actives: () => playersList,
        create: (player) => console.log(createOrRemovePlayer(player, 'create')),
        remove:  (player) => createOrRemovePlayer(player, 'remove'),
    }

    return playersActions[action] || playersActions.actives;
}

module.exports = { Players }
