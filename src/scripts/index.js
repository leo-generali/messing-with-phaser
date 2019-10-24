import Phaser from "phaser";
import Boot from "./scenes/Boot";

const config = {
  type: Phaser.AUTO, // Which renderer to use
  width: 800, // Canvas width in pixels
  height: 600, // Canvas height in pixels
  parent: "game-container", // ID of the DOM element to add the canvas to
  scene: [Boot]
};

const game = new Phaser.Game(config);
