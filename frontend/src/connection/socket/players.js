//actions
import {PlayerActions} from "../../events/entities/createPlayers"
import CreateGroupsPhaser from "../../groups/index"

export default (self) => {
    const playerActions = PlayerActions(self);

    const socket = self.socket;

    //listen to the server
    socket.on('connect', () => console.log('connected'))

    //return list of players
    socket.on('currentPlayers', (players) => { 
        Object.keys(players).find(id => id === self.socket.id ? playerActions.createPlayer(players[id]) : playerActions.createOthersPlayers(players[id]))
    })

    //new player
    socket.on('newPlayerConnected', (player) => { 
      playerActions.createOthersPlayers(player);
    })

    //player disconnected
    socket.on('playerDisconnected', (playerId) => { 
      console.log(self.textGroup.children)
      playerActions.destroyPlayer(playerId)
    });

    socket.on('playerMoved', (playerData) => {
       const player = self.otherPlayers.getChildren().find(player => player.id === playerData.id);
       if(!player) return false 
       player.setPosition(playerData.x, playerData.y);
    })

    
}