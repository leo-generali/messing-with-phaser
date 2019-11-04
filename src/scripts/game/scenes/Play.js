import { Scene, Physics } from "phaser";
import Player from "../Player";
import Enemy from "../Enemy";
import sprites from "../../../assets/sprites.png";
import tileset from "../../../assets/tileset.png";
import tilemap from "../../../assets/tilemaps/level_one.json";

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
    this.load.tilemapTiledJSON("map", tilemap);
  }

  create() {
    this.isPlayerDead = false;
    this.cameras.main.setBackgroundColor("#ade6ff");
    this.player = new Player({ scene: this, x: 20, y: 20 });
    this.enemy = new Enemy({ scene: this, x: 50, y: 20 });
    this.enemyGroup = this.add.group();
    this.projectileGroup = this.add.group();
    this.enemyGroup.add(this.enemy);

    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("platformer", "tiles");

    this.groundLayer = map.createStaticLayer("Platforms", tileset, 0, 0);
    this.groundLayer.setCollisionByExclusion([-1]);

    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.enemy, this.groundLayer);

    // this.cameras.main.startFollow(this.player);
  }

  update(time, delta) {
    if (this.isPlayerDead) return;

    this.enemyGroup.children.entries.forEach(sprite => {
      sprite.update(time, delta);
    });

    this.projectileGroup.children.entries.forEach(sprite => {
      sprite.update(time, delta);
    });

    this.player.update();
  }

  setPlayerDead() {
    this.isPlayerDead = true;
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
