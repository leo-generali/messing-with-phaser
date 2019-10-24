import Phaser from "phaser";
import { Play } from "./scenes";

const config = {
  type: Phaser.AUTO, // Which renderer to use
  width: 80, // Canvas width in pixels
  height: 80, // Canvas height in pixels
  pixelArt: true,
  zoom: 8,
  parent: "game-container", // ID of the DOM element to add the canvas to
  scene: [Play],
  physics: {
    debug: true,
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  }
};

new Phaser.Game(config);
