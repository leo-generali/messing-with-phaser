import { Scene } from "phaser";
import Player from "../Player";
import sprites from "../../assets/sprites.png";
import tileset from "../../assets/tileset.png";

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
    this.load.image("tiles", tileset);
  }

  create() {
    this.player = new Player({ scene: this, x: 20, y: 20 });

    this.level = this.physics.add.staticGroup();
    this.level.create(500 / 2 - 160, 200 / 2, "wall");
    // this.level.create(0, "wall");
    this.level.create(0, 160, "wall");
    this.level.create(32, 160, "wall");
    this.physics.add.collider(this.player, this.level);
  }

  update() {
    this.player.update();
  }
}
