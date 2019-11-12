import { Scene, Physics } from "phaser";
import Player from "../Player";
import Enemy from "../Enemy";
import playerSprites from "../../../assets/img/player";
import tileset from "../../../assets/img/tileset";

import sprites from "../../../assets/sprites.png";
// import tileset from "../../../assets/img/tileset.png";
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
      this.load.spritesheet(`player-sprite/${key}`, path, {
        frameHeight: 28,
        frameWidth: 34
      });
    });

    Object.entries(tileset).forEach(([key, path]) => {
      this.load.image(`tiles/${key}`, path);
    });

    this.load.spritesheet("characters", sprites, SPRITE_CONFIG);
    // this.load.image("tiles", tileset);
    this.load.tilemapTiledJSON("map", tilemap);
  }

  create() {
    this.isPlayerDead = false;

    const map = this.make.tilemap({ key: "map" });
    const terrainTileset = map.addTilesetImage("terrain", "tiles/terrain");
    const decorationTileset = map.addTilesetImage(
      "decoration",
      "tiles/decoration"
    );

    this.backgroundLayer = map.createStaticLayer("foreground", terrainTileset);
    this.foregroundLayer = map.createStaticLayer("background", terrainTileset);
    this.decorationLayer = map.createStaticLayer(
      "decoration",
      decorationTileset
    );

    this.backgroundLayer.setCollisionByExclusion([-1]);

    this.enemyGroup = this.add.group();

    const spawnPoint = map.findObject(
      "objects",
      obj => obj.name === "player_spawn"
    );

    this.player = new Player({ scene: this, x: spawnPoint.x, y: spawnPoint.y });

    const enemySpawns = map.objects[0].objects.filter(
      obj => obj.name === "enemy_spawn"
    );

    enemySpawns.forEach(spawn => {
      const enemy = new Enemy({ scene: this, x: spawn.x, y: spawn.y });
      this.enemyGroup.add(enemy);
      this.physics.add.collider(enemy, this.backgroundLayer);
    });

    this.physics.add.collider(this.player, this.backgroundLayer);
    this.cameras.main.setBackgroundColor("#3f3851");
  }

  update(time, delta) {
    if (this.isPlayerDead) return;

    this.enemyGroup.children.entries.forEach(sprite => {
      sprite.update(time, delta);
    });

    this.player.update();
  }

  setPlayerDead() {
    this.isPlayerDead = true;
  }
}
