import { GameObjects } from "phaser";

export default class extends GameObjects.Sprite {
  constructor({ scene, x, y }) {
    super(scene, x, y);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.body.setSize(46, 56).setOffset(0, 0);

    this.scene.anims.create({
      key: "door-anim/opening",
      frames: scene.anims.generateFrameNames("door-sprite/all", {
        frames: [2, 1, 0]
      }),
      frameRate: 9,
      repeat: -1
    });

    this.scene.physics.add.collider(this, this.scene.backgroundLayer);
    this.anims.play("door-anim/opening", true);
  }

  update() {
    console.log("asdasd");
  }
}
