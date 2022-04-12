

export default (self) => {
    self.otherPlayers = self.physics.add.group();
    self.textGroup = self.add.group();

    const searchObjectGame = (group) => {
        const player = self[group].getChildren().find(player => player.playerId === self.socket.id);
        console.log(player)
        return player;
    }

    return {searchObjectGame}
}