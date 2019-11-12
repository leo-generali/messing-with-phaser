import { GameObjects } from "phaser";
import { useContext } from "preact/hooks";

import { setAnimations } from "./animations";
import { Store } from "../../ui/store";
import StateMachine from "../../lib/StateMachine";
import {
  IdleState,
  MoveState,
  JumpState,
  AimState,
  ShootingState
} from "./states";

const DAMAGE_INVINCIBILITY_TIME = 100;
const JUMP_VELOCITY = -250;

export const DIRECTION = {
  LEFT: "left",
  RIGHT: "right"
};

export default class extends GameObjects.Sprite {
  constructor({ scene, x, y }) {
    super(scene, x, y);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    // Set the player's current direction
    this.direction = DIRECTION.RIGHT;

    // Hook into the UI
    this.dispatch = useContext(Store).dispatch;

    // Set the size of the player as the size of the character
    // Move offset to top left
    this.body.setSize(17, 16).setOffset(11, 11);

    // Add jump mechanic variables
    // Keep track of how long player has been holding jump button (for variable jump height)
    this.jumpTimer = 0;

    // Variables related to teleportation mechanic
    this.projectileTimer = 0;

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

    // Set up player state machine
    this.stateMachine = new StateMachine(
      "idle",
      {
        idle: new IdleState(),
        move: new MoveState(),
        jump: new JumpState()
        // aim: new AimState(),
        // shoot: new ShootingState()
      },
      { sprite: this }
    );
  }

  // Public Methods

  update() {
    this.stateMachine.step();
    // this._checkLives();
    // this.timeSinceLastHit++;
    // if (this.timeSinceLastHit > DAMAGE_INVINCIBILITY_TIME && this.alpha !== 1) {
    //   this.setAlpha(1);
    // }
  }

  enemyHit() {
    if (this.keys.up.isDown) {
      this.jump(-220);
    } else {
      this.jump(JUMP_VELOCITY);
    }
  }

  // Take one point of damage away if no damage is added
  takeDamage(damage = 1) {
    if (this.timeSinceLastHit > DAMAGE_INVINCIBILITY_TIME) {
      this.setAlpha(0.5);
      this.lives = this.lives - damage;
      this.scene.cameras.main.shake();
      this.timeSinceLastHit = 0;
      this.dispatch({ type: "UPDATE_LIVES", payload: this.lives });
    }
  }

  teleport(x, y) {
    this.x = x;
    this.y = y;
  }

  run(velocity) {
    this.body.setVelocityX(velocity);
  }

  jump(height) {
    this.body.setVelocityY(height);
  }

  isTouchingFloor() {
    return this.body.blocked.down;
  }
}
