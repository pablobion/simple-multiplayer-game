const PlayerActions = (self) => {

    const createName = (player) => {
         const name = new Phaser.GameObjects.Text(self, player.x, player.y -40, player.name,
             { font: "16px Arial", fill: '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16) }
         ).setOrigin(0.5);
        
     
        return self.add.existing(name)
    }

    const createPlayer = (player) => {
        //create local player
        const playerObj = new Phaser.GameObjects.Sprite(self, player.x, player.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40)
        const sla = createName(player)
        self.add.existing(playerObj)
        
    }

    const createOthersPlayers = (player) => {
        //create other players
        const otherPlayer = self.add.sprite(player.x, player.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
        otherPlayer.id = player.id;
        createName(player)
        self.otherPlayers.add(otherPlayer);      
    }

    const destroyPlayer = (playerId) => {
        self.otherPlayers.getChildren().find(player => player.id === playerId).destroy();
    }

    return {
        createPlayer, 
        createOthersPlayers,
        destroyPlayer
    }
}


module.exports = { PlayerActions }
