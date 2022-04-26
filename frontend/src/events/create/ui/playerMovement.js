import VirtualJoystick from 'phaser3-rex-plugins/plugins/virtualjoystick.js';
export default (self) => {


      const configJoyStick = (x = 200, y = 200) => {
        return {
            x, 
            y,
            base: self.add.circle(0, 0, 100, 0x888888),
            thumb: self.add.circle(0, 0, 50, 0xcccccc),
            dir: '8dir', 
            // forceMin: 1,
            // forceMax: 2,
            enable: true
            // base: this.add.circle(0, 0, 60, 0x888888).setDepth(100).setAlpha(0.25),
            // thumb: this.add.image(0, 0, 'joystick').setDisplaySize(80, 80).setDepth(100).setAlpha(0.5),
          }
      }

      const moveByTouch = (direction) => {
        self.socket.emit('playerPressKeyDown', {
            event : direction,
            key: direction,
        })
    }

    const movementJoyStick = new VirtualJoystick(self, configJoyStick()).on('update', (joystick) => {})
    self.ui.movementJoyStick = movementJoyStick
    
    const keys = movementJoyStick.createCursorKeys();

    Object.keys(keys).forEach(key => keys[key].on('down', () => {
      moveByTouch(key, 'pressDown')
      movementJoyStick.direction = key;
    }))

    self.keyboardCursors = self.input.keyboard.createCursorKeys();

    


  

    // self.input.on('pointerdown', (pointer) => {
    //     if (pointer.x <= self.cameras.main.width * 0.3) {
    //       movementJoyStick.base.setPosition(pointer.x, pointer.y).setAlpha(0.5)
    //       movementJoyStick.thumb.setPosition(pointer.x, pointer.y).setAlpha(1)
    //     }
    //     if (pointer.x >= self.cameras.main.width * 0.6) {
    //         fightJoyStick.base.setPosition(pointer.x, pointer.y).setAlpha(0.5)
    //         fightJoyStick.thumb.setPosition(pointer.x, pointer.y).setAlpha(1)
    //     }
    // })

      // Add transparency to joysticks on pointer-up
    // self.input.on('pointerup', (pointer) => {
    // if (!this.movementJoyStick.force) {
    //   movementJoyStick.base.setAlpha(0.25)
    //   movementJoyStick.thumb.setAlpha(0.5)
    // }
    // if (!this.fightJoyStick.force) {
    //   fightJoyStick.base.setAlpha(0.25)
    //   fightJoyStick.thumb.setAlpha(0.5)
    // }
    // })

  



    
}
