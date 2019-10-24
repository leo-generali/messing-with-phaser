export default class {
  constructor(scene, x = 30, y = 30) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, "npc", 0);
  }

  update() {
    this.sprite.body.setVelocity(0);
    this.sprite.body.setCollideWorldBounds(true);
  }

  talk() {
    console.log("asdasdas");
  }
}
