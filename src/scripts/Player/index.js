import { GameObjects } from "phaser";
import {
  setAnimations,
  IDLE_ANIM,
  WALKING_ANIM_DOWN,
  WALKING_ANIM_UP,
  WALKING_ANIM_SIDE
} from "./animations";

const ACCELERATION = 120;
const JUMP_TIME = 300;

export default class extends GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y);
    this.scene = config.scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.body.setCollideWorldBounds(true);
    this.body.setDragX(800);

    // Max Speed of Player Character
    this.body.maxVelocity.x = 100;

    // Add jump mechanic variables
    this.isJumping = false;
    this.jumpTimer = JUMP_TIME;

    this.body.setSize(16, 16);

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

  update({ delta }) {
    this._handleMovement();

    this.jumpTimer -= delta;
    if (this.jumpTimer < 0) {
      this.isJumping = false;
    }
  }

  _handleMovement() {
    if (this.keys.left.isDown) {
      this.flipX = true;
      this.anims.play(WALKING_ANIM_SIDE, true);
      this._run(-ACCELERATION);
    } else if (this.keys.right.isDown) {
      this.flipX = false;
      this.anims.play(WALKING_ANIM_SIDE, true);
      this._run(+ACCELERATION);
    } else {
      this.anims.play(IDLE_ANIM, true);
      this._run(0);
    }

    if (this.keys.up.isDown && this.isJumping === false) {
      this._jump();
    }
  }

  _run(velocity) {
    this.body.velocity.x = velocity;
  }

  _jump() {
    this.jumpTimer = JUMP_TIME;
    this.body.setVelocityY(-150);
    this.anims.play(IDLE_ANIM, true);
    this.isJumping = true;
  }
}
