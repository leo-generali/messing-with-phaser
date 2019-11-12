import { GameObjects } from "phaser";
import { setAnimations, IDLE_ANIM } from "./animations";

export default class extends GameObjects.Sprite {
  constructor({ scene, x, y }) {
    super(scene, x, y);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.body.setCollideWorldBounds(true);

    this.body.setSize(17, 16).setOffset(11, 11);

    this.setTint(0xff1c00);

    // Set all the animations for enemy
    setAnimations(this.scene);

    this.anims.play(IDLE_ANIM, true);
    this.player = this.scene.player;
  }

  update() {
    this.scene.physics.world.overlap(this, this.player, () => {
      this._checkIfVerticalHit();
    });
  }

  _checkIfVerticalHit() {
    if (this.player.body.velocity.y > 0) {
      this.player.enemyHit();
      // Kill this enemy
      this._kill();
    } else {
      this.player.takeDamage();
    }
  }

  _kill() {
    this.destroy();
  }
}
