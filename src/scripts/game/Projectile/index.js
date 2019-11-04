import { GameObjects } from "phaser";

const VELOCITY = { MIN: 120, MAX: 300 };
const MAX_PROJECTILE_TIMER = 20;
const DIFFERENCE = VELOCITY.MAX - VELOCITY.MIN;

export default class Projectile extends GameObjects.Sprite {
  constructor(config) {
    // Set up initial things
    super(config.scene, config.x, config.y);
    this.scene = config.scene;
    this.direction = config.direction;
    this.projectileTimer = config.projectileTimer;
    this.player = config.scene.player;

    // Let the projectible interact with the game world
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    // Remove the projectile if it hits the ground
    this.scene.physics.add.collider(this, this.scene.groundLayer, () => {
      this._kill();
    });

    // Set the size of the player as the size of the character
    // Move offset to top left
    this.body.setSize(12, 13).setOffset(2, 3);

    this.scene.anims.create({
      key: "projectile-anim/idle",
      frames: this.scene.anims.generateFrameNames("characters", {
        frames: [36]
      }),
      repeat: 1
    });

    this.anims.play("projectile-anim/idle", true);

    this._setVelocity();
  }

  update() {
    this._removeIfOutOfBounds();
  }

  _setVelocity() {
    const velocity =
      (this.projectileTimer / MAX_PROJECTILE_TIMER) * DIFFERENCE + VELOCITY.MIN;

    this.body.setVelocityY(-100);
    this.body.setVelocityX(
      this.direction === "left" ? velocity * -1 : velocity
    );
  }

  _removeIfOutOfBounds() {
    if (
      this.x < 0 ||
      this.x > this.scene.sys.game.config.width ||
      this.y < 0 ||
      this.y > this.scene.sys.game.config.height
    ) {
      this._kill();
    }
  }

  _kill() {
    this.player.teleport(this.x, this.y);
    this.destroy();
  }
}
