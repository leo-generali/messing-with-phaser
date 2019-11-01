import { GameObjects } from "phaser";

export default class extends GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.x);
    this.scene = config.scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.body.setCollideWorldBounds(true);

    this.body.setSize(16, 10);
    this.body.offset.set(0, 6);

    this.scene.anims.create({
      key: "enemy-anim/idle",
      frames: this.scene.anims.generateFrameNames("characters", {
        frames: [33]
      }),
      repeat: 1
    });

    this.anims.play("enemy-anim/idle", true);

    this.player = this.scene.player;
  }

  update() {
    this.scene.physics.world.overlap(this, this.player, this._verticalHit);
  }

  _verticalHit() {
    // console.log("You hit the thing!");
    // if (
    //   this.scene.player.body.velocity.y >= 0
    //   // this.player.body.y + this.player.body.height - enemy.body.y < 10
    // ) {
    //   console.log("From the top even!");
    // }
  }
}
