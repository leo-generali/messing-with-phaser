import { Scene, Physics } from "phaser";
import Player from "../Player";
import Enemy from "../Enemy";
import Door from "../Door";

import playerSprites from "../../../assets/img/player";
import tileset from "../../../assets/img/tileset";
import doorSprites from "../../../assets/img/door.png";

import tilemap from "../../../assets/tilemaps/level_one.json";

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

    // Load the different tilesets
    Object.entries(tileset).forEach(([key, path]) => {
      this.load.image(`tiles/${key}`, path);
    });

    this.load.spritesheet("door-sprite/all", doorSprites, {
      frameHeight: 56,
      frameWidth: 46
    });

    // Load the map
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

    const enemySpawns = map.objects[0].objects.filter(
      obj => obj.name === "enemy_spawn"
    );

    this.enemiesOnMap = enemySpawns.length;

    this.door = new Door({ scene: this, x: spawnPoint.x, y: spawnPoint.y });
    this.player = new Player({ scene: this, x: spawnPoint.x, y: spawnPoint.y });

    enemySpawns.forEach(spawn => {
      const enemy = new Enemy({ scene: this, x: spawn.x, y: spawn.y });
      this.enemyGroup.add(enemy);
      this.physics.add.collider(enemy, this.backgroundLayer);
    });

    this.physics.add.collider(this.player, this.backgroundLayer);
    this.cameras.main.setBackgroundColor("#3f3851");
  }

  update() {
    if (this.isPlayerDead) return;

    this.enemyGroup.children.entries.forEach(sprite => {
      sprite.update();
    });

    this.player.update();
    this.door.update();
  }

  setPlayerDead() {
    this.isPlayerDead = true;
  }
}
