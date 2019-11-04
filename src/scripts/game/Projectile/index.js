import { GameObjects } from "phaser";

const VELOCITY = 260;

export default class Projectile extends GameObjects.Sprite {
  constructor(config) {
    // Set up initial things
    super(config.scene, config.x, config.y);
    this.scene = config.scene;
    this.direction = config.direction;

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
    this.body.setVelocityY(-100);
  }

  update() {
    this._handleMovement();
    this._removeIfOutOfBounds();
  }

  // Private Methods

  _handleMovement() {
    const velocity = this.direction === "left" ? VELOCITY * -1 : VELOCITY;
    this.body.setVelocityX(velocity);
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
    this.destroy();
  }
}
