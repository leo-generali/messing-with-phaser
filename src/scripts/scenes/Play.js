import { Scene } from "phaser";
import Player from "../Player";
import playerIdle from "../../assets/sprites/player/idle.png";

export default class extends Scene {
  constructor() {
    super("play_scene");
  }

  preload() {
    this.load.spritesheet("player", playerIdle, {
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
