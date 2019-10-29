import { GameObjects } from "phaser";
import {
  setAnimations,
  IDLE_ANIM,
  WALKING_ANIM_DOWN,
  WALKING_ANIM_UP,
  WALKING_ANIM_SIDE
} from "./animations";

const VELOCITY = 32;
const ACCELERATION = 600;

export default class extends GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y);
    this.scene = config.scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.body.maxVelocity.x = 200;
    this.body.maxVelocity.y = 500;

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

  update() {
    // Stop player movement if no key is being pressed
    this.body.setVelocity(0);
    this.body.setCollideWorldBounds(true);
    this._handleMovement();
  }

  _handleMovement() {
    if (this.keys.left.isDown) {
      this.flipX = true;
      this._run(-ACCELERATION);
      this.anims.play(WALKING_ANIM_SIDE, true);
    }
    if (this.keys.right.isDown) {
      this.flipX = false;
      this._run(+ACCELERATION);
      this.anims.play(WALKING_ANIM_SIDE, true);
    }

    if (this.keys.right.isUp) {
      this.anims.play(IDLE_ANIM, true);
    }
  }

  _run(velocity) {
    this.body.setAccelerationX(velocity);
  }
}
