import Phaser from "phaser"
import logoImg from "./assets/logo.png"
import carImage from "./assets/car.png"
import tileset from "./assets/cloud_tileset.png"
import tilesetMap from "./assets/cloud-city.json"
import characters from "./assets/characters.png"


import { io } from "socket.io-client";

import PlayerActions from "./connection/socket/players"

//connections
import ConnectionWithServer from "./connection/index"

//groups sprites
import CreateGroupsPhaser from "./groups/index"

//create
import gameCreate from './events/create/index'

//update
import gameUpdate from "./events/update/index"

const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 800,
    height: 600,
    backgroundColor: "#000",
    frame: 60,
    render: {
        antialias: false,
      },
      // scale: {
      //   autoCenter: Phaser.Scale.CENTER_BOTH,
      // },
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: { y: 0 },
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
}

const game = new Phaser.Game(config)
game.TILE_SIZE = 48;


function preload() {
    this.load.image("logo", logoImg)
    this.load.image("ship", carImage)
    this.load.image("tiles", tileset)

    this.load.tilemapTiledJSON("cloud-city-map", tilesetMap);

    this.load.spritesheet("player", characters, {
      frameWidth: 26,
      frameHeight: 36,
    });
}


function create() {
    const self = this

    const cloudCityTilemap = this.make.tilemap({ key: "cloud-city-map" });

    cloudCityTilemap.addTilesetImage("Cloud City", "tiles");
    for (let i = 0; i < cloudCityTilemap.layers.length; i++) {
      const layer = cloudCityTilemap
        .createLayer(i, "Cloud City", 100, 100)
      layer.setDepth(i);
      layer.scale = 3;
    }





  

    
    // self.logo = this.add.image(400, 150, 'logo');
    //self.logo = this.physics.add.sprite(400, 150, 'logo');

    // this.tweens.add({
    //     targets: logo,
    //     y: 450,
    //     duration: 2000,
    //     ease: "Power2",
    //     yoyo: true,
    //     loop: -1
    // });
    CreateGroupsPhaser(self) //create group of sprites and object game
    gameCreate(self)
    ConnectionWithServer(self) //connection to the server
}

function update() {
    const self = this
    gameUpdate(self)


}

function render() {

  game.debug.cameraInfo(game.camera, 32, 32);
  game.debug.spriteCoords(player, 32, 500);

}

export default game