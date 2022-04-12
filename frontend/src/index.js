import Phaser, { Plugins } from 'phaser';

//connections
import ConnectionWithServer from "./connection/index"

//groups sprites
import CreateGroupsPhaser from "./groups/index"

//actions 
import playerMovement from './events/actions/playerMovement'

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#000',
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

function preload() {
  this.load.image('ship', require('./assets/car.png').default);

  //   this.load.scripts('inspector', [
  //   'https://cdn.jsdelivr.net/npm/tweakpane@3.0.5/dist/tweakpane.js',
  //   'https://cdn.jsdelivr.net/npm/phaser-plugin-inspector@1.5.0/dist/phaser-plugin-inspector.umd.js',
  // ]);
  // this.load.once('complete', () => {
  //   PhaserPluginInspector.Install(this.plugins);
  // });
}

function create() {
  const self = this;
  //start the game

  
  CreateGroupsPhaser(self) //create group of sprites and object game
  ConnectionWithServer(self) //connection to the server
  playerMovement(self)


  
}

function update() {
  const self = this;
 
  const teste = self.textGroup.getChildren()
  teste.forEach(elem => {
    const player = self.otherPlayers.getChildren().find(player => player.id === elem.id)
    elem.setPosition(player.x, player.y).setOrigin(0.5,3)
  })
}


