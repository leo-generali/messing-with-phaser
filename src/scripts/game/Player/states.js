import State from "../../lib/State";
import { DIRECTION } from "./index";
import { IDLE_ANIM, WALKING_ANIM, JUMP_ANIM, ROLLING_ANIM } from "./animations";
import { calculateShootingVelocity } from "./helpers";

const VELOCITY = 120;
const JUMP_VELOCITY = -450;

const SHOOT_PROJECTILE_TIMER = 20;
const SHOOT_VELOCITY = { MIN: 120, MAX: 400 };

export class IdleState extends State {
  enter({ sprite }) {
    sprite.anims.play(IDLE_ANIM, true);
    sprite.run(0);

    // In case the player is coming from a projectile state
    // we turn their ability to move back on
    sprite.body.moves = true;
  }

  execute({ sprite }) {
    const { left, right, up, shift } = sprite.keys;
    if (up.isDown && sprite.isTouchingFloor()) {
      this.stateMachine.transition("jump");
      return;
    }

    if (left.isDown || right.isDown) {
      this.stateMachine.transition("move");
      return;
    }

    if (shift.isDown) {
      this.stateMachine.transition("aim", { previousState: "idle" });
      return;
    }
  }
}

export class MoveState extends State {
  execute({ sprite }) {
    const { left, right, up, shift } = sprite.keys;

    if (up.isDown) {
      this.stateMachine.transition("jump");
      return;
    }

    // Handle left and right movement
    if (left.isDown) {
      sprite.direction = DIRECTION.LEFT;
      sprite.body.setOffset(11, 11);
      sprite.flipX = false;
      sprite.run(-VELOCITY);
      sprite.anims.play(WALKING_ANIM, true);
    } else if (right.isDown) {
      sprite.body.setOffset(5, 11);
      sprite.direction = DIRECTION.RIGHT;
      sprite.flipX = true;
      sprite.run(VELOCITY);
      sprite.anims.play(WALKING_ANIM, true);
    }

    if (shift.isDown) {
      this.stateMachine.transition("aim", { previousState: "move" });
      return;
    }

    if (!(left.isDown || right.isDown || up.isDown)) {
      this.stateMachine.transition("idle");
      return;
    }
  }
}

export class JumpState extends State {
  enter({ sprite }) {
    sprite.jump(JUMP_VELOCITY);
    sprite.anims.play(JUMP_ANIM, true);
  }

  execute({ sprite }) {
    const { left, right, shift } = sprite.keys;

    if (left.isDown) {
      sprite.direction = DIRECTION.LEFT;
      sprite.body.setOffset(11, 11);
      sprite.flipX = false;
      sprite.run(-VELOCITY);
    } else if (right.isDown) {
      sprite.direction = DIRECTION.RIGHT;
      sprite.body.setOffset(5, 11);
      sprite.flipX = true;
      sprite.run(VELOCITY);
    }

    if (!(left.isDown || right.isDown)) {
      sprite.run(0);
    }

    if (sprite.isTouchingFloor()) {
      this.stateMachine.transition("idle");
      return;
    }

    if (shift.isDown) {
      this.stateMachine.transition("aim", { previousState: "jump" });
      return;
    }
  }
}

export class AimState extends State {
  enter({ sprite, previousState }) {
    sprite.projectileTimer = 0;
    sprite.previousState = previousState;
    sprite.run(0);

    // Stop character movement if jumping
    if (sprite.previousState === "jump") {
      sprite.body.moves = false;
    }
  }

  execute({ sprite }) {
    const { shift } = sprite.keys;
    sprite.projectileTimer++;

    if (shift.isUp) {
      this.stateMachine.transition("shoot");
    }
  }
}

export class ShootingState extends State {
  enter({ sprite }) {
    sprite.anims.play(ROLLING_ANIM, true);
    const shootingVelocity = calculateShootingVelocity(
      SHOOT_VELOCITY.MIN,
      SHOOT_VELOCITY.MAX,
      sprite.projectileTimer,
      SHOOT_PROJECTILE_TIMER
    );

    sprite.body.moves = true;
    sprite.body.setVelocityY(-200);
    sprite.body.setVelocityX(
      sprite.direction === "left" ? -shootingVelocity : shootingVelocity
    );
  }

  execute({ sprite }) {
    if (sprite.isTouchingFloor()) {
      this.stateMachine.transition("idle");
    }
  }
}
