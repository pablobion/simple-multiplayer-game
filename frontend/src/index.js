import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import carImage from './assets/car.png'
import io from 'socket.io-client'

//connections
import ConnectionWithServer from "./connection/index"

//groups sprites
import CreateGroupsPhaser from "./groups/index"

//actions 
import playerMovement from './events/actions/playerMovement'

//update
import playerMovementUpdate from './events/update/playerMovement'

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
    },
}


const game = new Phaser.Game(config);



function preload ()
{
    this.load.image('logo', logoImg);
    this.load.image('ship', carImage);
}
  
function create() {
    const self = this;

    // const logo = this.add.image(400, 150, 'logo');
  
    // this.tweens.add({
    //     targets: logo,
    //     y: 450,
    //     duration: 2000,
    //     ease: "Power2",
    //     yoyo: true,
    //     loop: -1
    // });

    CreateGroupsPhaser(self) //create group of sprites and object game
  ConnectionWithServer(self) //connection to the server


  self.keyboardCursors = this.input.keyboard.createCursorKeys();

  
  playerMovement(self)
}

function update(){
  const self = this;



  playerMovementUpdate(self)
}



