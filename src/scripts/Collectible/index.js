import { GameObjects } from "phaser";

export default class Collectible extends GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y);
    this.scene = config.scene;
    this.scene.add.existin(this);
    this.scene.physics.world.enable(this);
  }
}
