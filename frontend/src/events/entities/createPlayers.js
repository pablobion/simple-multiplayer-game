const PlayerActions = (self) => {

    const createName = (player) => {
         const nameObjText = new Phaser.GameObjects.Text(self, player.x, player.y -40, player.name,
             { font: "16px Arial", fill: '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16) }
         ).setOrigin(0.5);

        const nameObj = self.add.existing(nameObjText)
        nameObj.id = player.id
 
        return nameObj
    }

    const createPlayer = (player) => {
        //create local player
        const playerObj = new Phaser.GameObjects.Sprite(self, player.x, player.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40)
        const playerAdd = self.add.existing(playerObj)
        playerAdd.id = player.id
        self.otherPlayers.add(playerAdd); 

        const name = createName(player)
        self.textGroup.add(name)
        
    }

    const createOthersPlayers = (player) => {
        //create other players
        const otherPlayer = self.add.sprite(player.x, player.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
        otherPlayer.id = player.id;
        self.otherPlayers.add(otherPlayer);  
        
        otherPlayer.setInteractive();

        otherPlayer.on('pointerdown', (elem) => {otherPlayer.setTint(0xB95022)})

        const name = createName(player)
        self.textGroup.add(name)
    }

    const destroyPlayer = (playerId) => {
        const groups = ['otherPlayers', 'textGroup']
        groups.forEach(element => self[element].getChildren().find(player => player.id === playerId).destroy());
    }

    return {
        createPlayer, 
        createOthersPlayers,
        destroyPlayer
    }
}


module.exports = { PlayerActions }
