import Phaser from "phaser";
import { Boot, Play } from "./scenes";

const config = {
  type: Phaser.AUTO, // Which renderer to use
  width: 171, // Canvas width in pixels
  height: 160, // Canvas height in pixels
  zoom: 3,
  pixelArt: true,
  parent: "game-container", // ID of the DOM element to add the canvas to
  scene: [Boot, Play]
};

const game = new Phaser.Game(config);
