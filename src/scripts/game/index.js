import Phaser from "phaser";
import { h } from "preact";
import { useEffect } from "preact/hooks";
import { memo } from "preact/compat";
import { Play } from "./scenes";

const config = {
  type: Phaser.AUTO, // Which renderer to use
  width: 640, // Canvas width in pixels
  height: 320, // Canvas height in pixels
  pixelArt: true,
  zoom: 2,
  parent: "game", // ID of the DOM element to add the canvas to
  scene: [Play],
  physics: {
    arcade: {
      gravity: { y: 500 },
      debug: true
    },
    default: "arcade"
  }
};

export const Game = memo(
  () => {
    useEffect(() => {
      new Phaser.Game(config);
    }, []);

    return <div id="game" />;
  },
  () => false
);
