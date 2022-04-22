
export default (self) => {

    if(self?.ui?.movementJoyStick?.force > 0){
        self.socket.emit('playerPressKeyDown', {
          event : self.ui.movementJoyStick.direction,
          key: self.ui.movementJoyStick.direction
      })
    }

    const keysKeyboard = Object.keys(self.keyboardCursors);
    

    for(let i = 0; i < keysKeyboard.length; i++) {
        if(self.keyboardCursors[keysKeyboard[i]].isDown) {
            self.socket.emit('playerPressKeyDown', {
                event : keysKeyboard[i],
                key: keysKeyboard[i],
            })
        }
  }
 
    
    }

