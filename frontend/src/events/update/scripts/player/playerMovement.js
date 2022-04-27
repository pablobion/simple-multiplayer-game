import Context from '../../../context/players'
export default (self) => {
    const context = Context(self);

    if(self?.ui?.movementJoyStick?.force > 0){
        self.socket.emit('playerPressKeyDown', {
          event : self.ui.movementJoyStick.direction,
          key: self.ui.movementJoyStick.direction
      })
    }

    const keysKeyboard = Object.keys(self.keyboardCursors);


    const verifyIsBlocked = (posPlayer, key) => {
        let isBlocked = false;
        if(key === 'right'){
            isBlocked = self.gridEngine.isTileBlocked({x: posPlayer.x+1, y: posPlayer.y})
        }
        if(key === 'left'){
            isBlocked = self.gridEngine.isTileBlocked({x: posPlayer.x-1, y: posPlayer.y})
        }
        if(key === 'up'){
            isBlocked = self.gridEngine.isTileBlocked({x: posPlayer.x, y: posPlayer.y-1})
        }
        if(key === 'down'){
            isBlocked = self.gridEngine.isTileBlocked({x: posPlayer.x, y: posPlayer.y+1})
        }
        return isBlocked
    }

    for(let i = 0; i < keysKeyboard.length; i++) {
        if(self.keyboardCursors[keysKeyboard[i]].isDown) {
            const posPlayer = context.getPosition(self.socket.id);
            const isBlocked = verifyIsBlocked(posPlayer, keysKeyboard[i])
            if(isBlocked) return false;
            
            self.socket.emit('playerPressKeyDown', {
                event : keysKeyboard[i],
                key: keysKeyboard[i],
                position: context.getPosition(self.socket.id)
            })
        }
    }

 
 
}

