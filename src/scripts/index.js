import Phaser from "phaser";
import { Play } from "./scenes";

const config = {
  type: Phaser.AUTO, // Which renderer to use
  width: 100, // Canvas width in pixels
  height: 100, // Canvas height in pixels
  pixelArt: true,
  zoom: 8,
  parent: "game-container", // ID of the DOM element to add the canvas to
  scene: [Play],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  }
};

new Phaser.Game(config);
