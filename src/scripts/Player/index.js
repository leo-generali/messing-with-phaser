import { GameObjects } from "phaser";
import { setAnimations, IDLE_ANIM, WALKING_ANIM_SIDE } from "./animations";
import { useContext } from "preact/hooks";
import { Store } from "../ui/store";

const VELOCITY = 120;
const JUMP_VELOCITY = -145;
const DAMAGE_INVINCIBILITY_TIME = 60;

export default class extends GameObjects.Sprite {
  constructor({ scene, x, y }) {
    super(scene, x, y);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    // Hook into the UI
    this.dispatch = useContext(Store).dispatch;

    // Set the size of the player as the size of the character
    // Move offset to top left
    this.body.setSize(12, 13).setOffset(2, 3);

    // Add jump mechanic variables
    // Keep track of how long player has been holding jump button (for variable jump height)
    this.jumpTimer = 0;

    // Set all the animations for Mario
    setAnimations(this.scene);

    // Variables related to player health
    this.lives = 3;
    this.timeSinceLastHit = DAMAGE_INVINCIBILITY_TIME;

    const { LEFT, RIGHT, UP, DOWN, SHIFT } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = this.scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN,
      shift: SHIFT
    });
  }

  // Public Methods

  update() {
    this._handleMovement();
    this._checkLives();

    this.timeSinceLastHit++;
  }

  enemyHit() {
    if (this.keys.up.isDown) {
      this._jump(-220);
    } else {
      this._jump(JUMP_VELOCITY);
    }
  }

  // Take one point of damage away if no damage is added
  takeDamage(damage = 1) {
    if (this.timeSinceLastHit > DAMAGE_INVINCIBILITY_TIME) {
      this.lives = this.lives - damage;
      this.scene.cameras.main.shake();
      this.timeSinceLastHit = 0;
      this.dispatch({ type: "UPDATE_LIVES", payload: this.lives });
    }
  }

  // Private Methods

  _checkLives() {
    if (this.lives < 1) {
      this.scene.setPlayerDead();
      this.destroy(true);
    }
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
      } else if (this.jumpTimer > 0 && this.jumpTimer < 10) {
        this.jumpTimer++;
        this._jump(JUMP_VELOCITY + this.jumpTimer * 1.5);
      }
    } else {
      if (this.jumpTimer != 0) this.jumpTimer = 0;
    }
  }

  _run(velocity) {
    this.body.setVelocityX(velocity);
  }

  _jump(height) {
    this.body.setVelocityY(height);
  }

  _isTouchingFloor() {
    return this.body.blocked.down;
  }
}
