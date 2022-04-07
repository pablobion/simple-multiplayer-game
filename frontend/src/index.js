import Phaser from 'phaser';
import { io } from "socket.io-client";

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

function create() {
    const canva = this;

     const socket = io(
        'http://localhost:3000'
     )
    socket.on('connect', () => {
        console.log('connected')

    })
    const logo = canva.add.image(400, 150, 'logo');
      
    canva.tweens.add({
        targets: logo,
        y: 450,
        duration: 2000,
        ease: "Power2",
        yoyo: true,
        loop: -1
    });
  
}
function preload() {}
function update() {}


