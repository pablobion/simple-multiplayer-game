//actions
import PlayerActions from "../../events/entities/createPlayers"
import CreateGroupsPhaser from "../../groups/index"

export default (self) => {
    const playerActions = PlayerActions(self);

    const socket = self.socket;

    //listen to the server
    socket.on('connect', () => console.log('connected'))

    //return list of players
    socket.on('currentPlayers', (players) => Object.keys(players).forEach(id => playerActions.createPlayer(players[id])) )

    //new player
    socket.on('newPlayerConnected', (player) => { 
      playerActions.createPlayer(player);
    })

    //player disconnected
    socket.on('playerDisconnected', (playerId) => { 
      playerActions.destroyPlayer(playerId)
    });

    socket.on('playerMoved', (playerData) => playerActions.findPlayerSprite(playerData.id).setPosition(playerData.x, playerData.y))

    
}