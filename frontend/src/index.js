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

function preload() {
  this.load.image('ship', require('./assets/car.png').default);
}

function create() {
  const self = this;
  this.socket = io( 'http://localhost:3000' );
  this.otherPlayers = this.physics.add.group();

    function addPlayer(player) {
      self.ship = self.physics.add.image(player.x, player.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
      self.ship.setDrag(100);
      self.ship.setAngularDrag(100);
      self.ship.setMaxVelocity(200);
    }

    function addOtherPlayers(player) {
      const otherPlayer = self.add.sprite(player.x, player.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);

      otherPlayer.id = player.id;
      self.otherPlayers.add(otherPlayer);
    }

    this.socket.on('connect', () => console.log('connected'))

    self.socket.on('currentPlayers', (players) => {
      Object.keys(players).find(id => id === self.socket.id ? addPlayer(players[id]) : addOtherPlayers(players[id]))
    })

    self.socket.on('newPlayerConnected', (player) => {
      addOtherPlayers(player);
    })

    self.socket.on('playerDisconnected', (playerId) => self.otherPlayers.getChildren().find(player => player.id === playerId).destroy())
  
}

function update() {}


