import VirtualJoystick from 'phaser3-rex-plugins/plugins/virtualjoystick.js';
export default (self) => {

    var joyStick1 = new VirtualJoystick(self, {
      x: 200, y: 200,
        base: self.add.circle(0, 0, 100, 0x888888),
        thumb: self.add.circle(0, 0, 50, 0xcccccc),
        dir: '4dir', 
        forceMin: 16,
        enable: true
    });


    const moveByTouch = (direction) => {
        self.socket.emit('playerPressKeyDown', {
            event : direction,
            key: direction,
        })
    }

    const keys = joyStick1.createCursorKeys();

    Object.keys(keys).forEach(key => keys[key].on('down', () => moveByTouch(key)))

    self.input.keyboard.on('keydown', (event) => { 
              self.socket.emit('playerPressKeyDown', {
                    event,
                    key: event.key,
              })
    });
}
