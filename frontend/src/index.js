import Phaser, { Plugins } from 'phaser';
import { io } from "socket.io-client";
import {PlayerActions} from "./events/entities/createPlayers"

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
  self.socket = io( 'http://localhost:3000' );
  self.otherPlayers = this.physics.add.group();
  self.textGroup = this.add.group();

  //start the game
  const playerActions = PlayerActions(self)

    self.socket.on('connect', () => console.log('connected'))

    self.socket.on('currentPlayers', (players) => {
      Object.keys(players).find(id => id === self.socket.id ? playerActions.createPlayer(players[id]) : playerActions.createOthersPlayers(players[id]))
    })

    self.socket.on('newPlayerConnected', (player) => {
      playerActions.createOthersPlayers(player);
    })

    self.socket.on('playerDisconnected', (playerId) => playerActions.destroyPlayer(playerId));

    self.socket.on('playerSays', (player) => {
  
      
    })
  
}

function update() {}


