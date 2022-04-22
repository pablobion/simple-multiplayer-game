

export default (self) => {
    self.ui = {};
    self.otherPlayers = self.physics.add.group();
    self.textGroup = self.add.group();

    const searchObjectGame = (group) => {
        const player = self[group].getChildren().find(player => player.playerId === self.socket.id);
        return player;
    }

    return {searchObjectGame}
}