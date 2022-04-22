const PlayerActions = (self) => {

    const createName = (player) => {
         const nameObjText = new Phaser.GameObjects.Text(self, player.x, player.y -40, player.name,
             { font: "16px Arial", fill: '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16) }
         ).setOrigin(0.5);

         const nameObj = self.add.existing(nameObjText)
         nameObj.playerId = player.id
        self.playersNameGroup.add(nameObjText)
        
        return nameObj
    }

    const createPlayer = (playerData) => {
        //create other players
        const player = self.add.sprite(playerData.x, playerData.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
        player.playerId = playerData.id;
        self.playersGroup.add(player);  
        
        player.setInteractive();

        player.on('pointerdown', (elem) => {player.setTint(0xB95022)})

        createName(playerData)
       
    }

    return {
        createPlayer
    }
}


module.exports = PlayerActions 
