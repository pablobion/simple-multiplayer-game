import Phaser from "phaser"
import logoImg from "./assets/logo.png"
import carImage from "./assets/car.png"
import tileset from "./assets/cloud_tileset.png"
import tilesetMap from "./assets/cloud-city.json"
import characters from "./assets/characters.png"

import GridEngine from 'grid-engine'

//connections
import ConnectionWithServer from "./connection/index"

//groups sprites
import CreateGroupsPhaser from "./groups/index"

//create
import gameCreate from './events/create/index'

//update
import gameUpdate from "./events/update/index"

import world from '../src/events/create/world/index'

import Context from '../src/events/context/players'

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
    plugins: {
        scene: [
          {
            key: "gridEngine",
            plugin: GridEngine,
            mapping: "gridEngine",
          },
        ],
      },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
}

const game = new Phaser.Game(config)

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
    
    const self = this;

    world(self).createMap(); //criando tiledma
    ConnectionWithServer(self) //connection to the server

    CreateGroupsPhaser(self) //create group of sprites and object game
    gameCreate(self)


}

function update() {
    const self = this
   
    gameUpdate(self)





}

export default game