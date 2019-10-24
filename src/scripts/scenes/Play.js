import { Scene } from "phaser";
import Player from "../Player";
import playerSpritesheet from "../../assets/sprites/player.png";

export default class extends Scene {
  constructor() {
    super("play_scene");
  }

  preload() {
    this.load.spritesheet("player", playerSpritesheet, {
      frameHeight: 8,
      frameWidth: 8
    });
  }

  create() {
    this.player = new Player(this);
  }

  update(time, delta) {
    this.player.update();
  }
}
