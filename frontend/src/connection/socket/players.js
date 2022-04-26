//actions
import PlayerActions from "../../events/create/entities/createPlayers"
import Utils from '../../events/utils/index'
import Context from '../../events/context/players'

export default (self) => {
    const playerActions = PlayerActions(self);
    const utils = Utils(self);
    const context = Context(self);
    
    // //listen to the server
     self.socket.on('connect', () => {
      console.log('connected...')
    })

    //retorna lista de players online para o usuario que acabou de entrar
    self.socket.on('currentPlayers', (players) => {
      Object.keys(players).forEach(id => {
        const player = players[id];
        const playerCreated = playerActions.createPlayer(player)
        context.addPlayerToGridConfigMap({id, sprite: playerCreated, x: player.x, y: player.y});
      })
    })

    //emit de um novo player para os que ja estavam online
    self.socket.on('newPlayerConnected', (player) => { 
      const playerCreated = playerActions.createPlayer(player);
      context.addPlayerToGridConfigMap({id: player.id, sprite: playerCreated, x: player.x, y: player.y}) 
    })

    //player disconnected
    self.socket.on('playerDisconnected', (playerId) => { 
      utils.destroySpriteByPlayerId({group: 'playersNameGroup', playerId, allGroups: true})
      context.removePlayerFromGridConfigMap(playerId)
    });

    self.socket.on('playerMoved', (playerData) => {
      self.gridEngine.move(playerData.id, playerData.moveDirection);
      context.updateCharacterPosition({id: playerData.id, x :playerData.x,  y: playerData.y})
     
   
    
      //utils.findSpritesByPlayerId({group: 'playersGroup', playerId: playerData.id}).setPosition(playerData.x, playerData.y)
      //utils.findSpritesByPlayerId({group: 'playersNameGroup', playerId: playerData.id}).setPosition(playerData.x, playerData.y-40)
      
    })

    
}