import Phaser from "phaser";
import { Play } from "./scenes";

const config = {
  type: Phaser.AUTO, // Which renderer to use
  width: 400, // Canvas width in pixels
  height: 80, // Canvas height in pixels
  pixelArt: true,
  zoom: 4,
  parent: "game-container", // ID of the DOM element to add the canvas to
  scene: [Play],
  physics: {
    arcade: {
      gravity: {
        y: 800
      },
      debug: false
    },
    default: "arcade"
  }
};

new Phaser.Game(config);
