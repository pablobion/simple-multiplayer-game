import Phaser from "phaser"
import logoImg from "./assets/logo.png"
import carImage from "./assets/car.png"

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

function preload() {
    this.load.image("logo", logoImg)
    this.load.image("ship", carImage)

}


function create() {
    const self = this
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
