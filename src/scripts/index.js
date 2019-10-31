import Phaser from "phaser";
import { Play } from "./scenes";

const config = {
  type: Phaser.AUTO, // Which renderer to use
  width: 192, // Canvas width in pixels
  height: 160, // Canvas height in pixels
  pixelArt: true,
  zoom: 3,
  parent: "game-container", // ID of the DOM element to add the canvas to
  scene: [Play],
  physics: {
    arcade: {
      gravity: { y: 500 },
      debug: true
    },
    default: "arcade"
  }
};

new Phaser.Game(config);
