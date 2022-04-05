const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#ffffff',
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
        gravity: { y: 0 }
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
}

const game = new Phaser.Game(config);

function create() {
    const self = this;
    const socket = io()
    socket.on('connect', () => {
        console.log('connected')
        console.log(self)
    })
  
}
function preload() {}
function update() {}


