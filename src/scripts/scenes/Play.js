import { Scene } from "phaser";
import Player from "../Player";
import sprites from "../../assets/sprites/sprites.png";

const SPRITE_CONFIG = {
  frameHeight: 16,
  frameWidth: 16
};

export default class extends Scene {
  constructor() {
    super("play_scene");
  }

  preload() {
    this.load.spritesheet("player", sprites, SPRITE_CONFIG);
  }

  create() {
    this.player = new Player({ scene: this, x: 20, y: 20 });
  }

  update(time, delta) {
    this.player.update({ delta });
  }
}
