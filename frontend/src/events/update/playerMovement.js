export default (self) => {

    if(self?.ui?.movementJoyStick?.force > 0){
        self.socket.emit('playerPressKeyDown', {
          event : self.ui.movementJoyStick.direction,
          key: self.ui.movementJoyStick.direction
      })
    }

   
 
    
    }

