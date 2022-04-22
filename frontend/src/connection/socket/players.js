//actions
import PlayerActions from "../../events/create/entities/createPlayers"
import Utils from '../../events/utils/index'

export default (self) => {
    const playerActions = PlayerActions(self);
    const utils = Utils(self);
    
    // //listen to the server
     self.socket.on('connect', () => console.log('connected...'))

    //return list of players
    self.socket.on('currentPlayers', (players) => Object.keys(players).forEach(id => playerActions.createPlayer(players[id])) )

    //new player
    self.socket.on('newPlayerConnected', (player) => { 
      playerActions.createPlayer(player);
    })

    //player disconnected
    self.socket.on('playerDisconnected', (playerId) => { 
      utils.destroySpriteByPlayerId({group: 'playersNameGroup', playerId, allGroups: true})
    });

    self.socket.on('playerMoved', (playerData) => {
      utils.findSpritesByPlayerId({group: 'playersGroup', playerId: playerData.id}).setPosition(playerData.x, playerData.y)
      utils.findSpritesByPlayerId({group: 'playersNameGroup', playerId: playerData.id}).setPosition(playerData.x, playerData.y-40)
      
    })

    
}