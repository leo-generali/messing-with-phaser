import { GameObjects } from "phaser";
import { setAnimations, IDLE_ANIM, WALKING_ANIM_SIDE } from "./animations";

const VELOCITY = 120;
const JUMP_VELOCITY = -140;

export default class extends GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y);
    this.scene = config.scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.body.setCollideWorldBounds(true);
    // this.body.setDragX(800);

    // Add jump mechanic variables
    // Keep track of how long player has been holding jump button (for variable jump height)
    this.jumpTimer = 0;

    // Set the size of the player as the size of the character
    // Move offset to top left
    this.body.setSize(12, 13);
    this.body.offset.set(2, 3);

    // Set all the animations for Mario
    setAnimations(this.scene);

    const { LEFT, RIGHT, UP, DOWN, SHIFT } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = this.scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN,
      shift: SHIFT
    });
  }

  update() {
    this._handleMovement();
  }

  _handleMovement() {
    if (this.keys.left.isDown) {
      this.flipX = true;
      this.anims.play(WALKING_ANIM_SIDE, true);
      this._run(-VELOCITY);
    } else if (this.keys.right.isDown) {
      this.flipX = false;
      this.anims.play(WALKING_ANIM_SIDE, true);
      this._run(+VELOCITY);
    } else {
      this.anims.play(IDLE_ANIM, true);
      this._run(0);
    }

    if (this.keys.up.isDown) {
      if (this._isTouchingFloor() && this.jumpTimer === 0) {
        this.jumpTimer = 1;
        this._jump(JUMP_VELOCITY);
      } else if (this.jumpTimer > 0 && this.jumpTimer < 30) {
        this.jumpTimer++;
        this._jump(JUMP_VELOCITY + this.jumpTimer * 3.5);
      }
    } else {
      if (this.jumpTimer != 0) this.jumpTimer = 0;
    }
  }

  // Public Method

  enemyHit() {
    if (this.keys.up.isDown) {
      this._jump(-220);
    } else {
      this._jump(JUMP_VELOCITY);
    }
  }

  // Private Methods

  _run(velocity) {
    this.body.velocity.x = velocity;
  }

  _jump(height) {
    this.body.setVelocityY(height);
  }

  _isTouchingFloor() {
    return this.body.blocked.down;
  }
}
