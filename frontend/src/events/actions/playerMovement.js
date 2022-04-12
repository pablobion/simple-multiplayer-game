export default (self) => {

    self.input.keyboard.on('keydown', (event) => { 
              self.socket.emit('playerPressKeyDown', {
                    event,
                    key: event.key,
              })
    });
}
