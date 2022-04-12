const PlayerActions = (self) => {

    const createName = (player) => {
         const nameObjText = new Phaser.GameObjects.Text(self, player.x, player.y -40, player.name,
             { font: "16px Arial", fill: '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16) }
         ).setOrigin(0.5);

        const nameObj = self.add.existing(nameObjText)
        nameObj.id = player.id
 
        return nameObj
    }

    const findPlayerSprite = (playerId) => self.otherPlayers.getChildren().find(player => player.id === playerId)

    const createPlayer = (playerData) => {
        //create other players
        const player = self.add.sprite(playerData.x, playerData.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
        player.id = playerData.id;
        self.otherPlayers.add(player);  
        
        player.setInteractive();

        player.on('pointerdown', (elem) => {player.setTint(0xB95022)})

        const name = createName(playerData)
        self.textGroup.add(name)
    }

    const destroyPlayer = (playerId) => {
        const groups = ['otherPlayers', 'textGroup']
        groups.forEach(element => self[element].getChildren().find(player => player.id === playerId).destroy());
    }

    return {
        createPlayer, 
        destroyPlayer,
        findPlayerSprite
    }
}


module.exports = PlayerActions 
