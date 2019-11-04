import { h, render, Fragment } from "preact";
import { useEffect } from "preact/hooks";
import { memo } from "preact/compat";
import { UI } from "./ui";
import { Play } from "./scenes";
import Phaser from "phaser";

const config = {
  type: Phaser.AUTO, // Which renderer to use
  width: 160, // Canvas width in pixels
  height: 160, // Canvas height in pixels
  pixelArt: true,
  zoom: 3,
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

const Game = memo(
  () => {
    useEffect(() => {
      new Phaser.Game(config);
    }, []);

    return <div id="game" />;
  },
  (_, __) => false
);

const App = () => {
  return (
    <Fragment>
      <UI />
      <Game />
    </Fragment>
  );
};

render(<App />, document.body);
