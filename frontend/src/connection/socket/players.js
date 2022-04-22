//actions
import PlayerActions from "../../events/create/entities/createPlayers"

export default (self) => {
    const playerActions = PlayerActions(self);
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
      playerActions.destroyPlayer(playerId)
    });

    self.socket.on('playerMoved', (playerData) => {
      playerActions.findPlayerSprite(playerData.id).setPosition(playerData.x, playerData.y)
      self.textGroup.getChildren().find(player => player.id === playerData.id).setPosition(playerData.x, playerData.y-40)
    })

    
}