import { Scene, Physics } from "phaser";
import Player from "../Player";
import Enemy from "../Enemy";
import sprites from "../../assets/sprites.png";
import tileset from "../../assets/tileset.png";
import { levelOne } from "../../assets/levels";

const SPRITE_CONFIG = {
  frameHeight: 16,
  frameWidth: 16
};

export default class extends Scene {
  constructor() {
    super({ key: "play_scene" });
  }

  preload() {
    this.load.spritesheet("characters", sprites, SPRITE_CONFIG);
    this.load.image("tiles", tileset);
  }

  create() {
    this.cameras.main.setBackgroundColor("#ade6ff");
    this.player = new Player({ scene: this, x: 20, y: 20 });
    this.enemy = new Enemy({ scene: this, x: 50, y: 20 });

    const map = this.make.tilemap({
      data: Map.graphicMapToTilemap(levelOne),
      tileWidth: 16,
      tileHeight: 16
    });

    const tiles = map.addTilesetImage("tiles");
    const groundLayer = map.createStaticLayer(0, tiles, 0, 0);

    groundLayer.setCollisionByExclusion([-1]);

    this.physics.add.collider(this.player, groundLayer);
    this.physics.add.collider(this.enemy, groundLayer);
  }

  update(time, delta) {
    this.player.update();
    this.enemy.update();
  }
}

const MAP_CONFIG = {
  "[": 0,
  "/": 1,
  "]": 2,
  " ": null
};

class Map {
  static graphicMapToTilemap(map) {
    return map.map(layer => layer.split("").map(tile => MAP_CONFIG[tile]));
  }
}
