import { Scene, Physics } from "phaser";
import Player from "../Player";
import Enemy from "../Enemy";
import playerSprites from "../../../assets/img/player";
import backgroundImages from "../../../assets/img/bg";

import sprites from "../../../assets/sprites.png";
import tileset from "../../../assets/img/tileset.png";
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
    // Load all of the player sprites
    Object.entries(playerSprites).forEach(([key, path]) => {
      this.load.spritesheet(`player-anim/${key}`, path, SPRITE_CONFIG);
    });

    Object.entries(backgroundImages).forEach(([color, path]) => {
      this.load.image(`bg-image/${color}`, path);
    });

    this.load.spritesheet("characters", sprites, SPRITE_CONFIG);
    this.load.image("tiles", tileset);
    this.load.tilemapTiledJSON("map", tilemap);
  }

  create() {
    this.isPlayerDead = false;

    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("tileset", "tiles");

    this.backgroundLayer = map.createStaticLayer("Background", tileset, 0, 0);
    this.foregroundLayer = map.createStaticLayer("Foreground", tileset, 0, 0);
    this.foregroundLayer.setCollisionByExclusion([-1]);

    this.player = new Player({ scene: this, x: 200, y: 200 });
    this.enemy = new Enemy({ scene: this, x: 250, y: 200 });

    this.enemyGroup = this.add.group();
    this.projectileGroup = this.add.group();
    this.enemyGroup.add(this.enemy);

    this.physics.add.collider(this.player, this.foregroundLayer);
    this.physics.add.collider(this.enemy, this.foregroundLayer);

    this.cameras.main.setBackgroundColor("#211f30");
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
