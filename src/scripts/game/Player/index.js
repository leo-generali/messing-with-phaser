import { GameObjects } from "phaser";
import Projectile from "../Projectile";
import {
  setAnimations,
  IDLE_ANIM,
  WALKING_ANIM_SIDE,
  JUMP_ANIM,
  FALL_ANIM
} from "./animations";
import { useContext } from "preact/hooks";
import { Store } from "../../ui/store";

const VELOCITY = 120;
const JUMP_VELOCITY = -250;
const DAMAGE_INVINCIBILITY_TIME = 60;
const MAX_PROJECTILE_TIMER = 20;

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
    this.body.setSize(16, 21).setOffset(8, 9);

    // Add jump mechanic variables
    // Keep track of how long player has been holding jump button (for variable jump height)
    this.jumpTimer = 0;

    // Variables related to teleportation mechanic
    this.projectileTimer = 0;
    this.projectileTimerText = "";

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
    this._handleProjectile();

    this.timeSinceLastHit++;

    if (this.timeSinceLastHit > DAMAGE_INVINCIBILITY_TIME && this.alpha !== 1) {
      this.setAlpha(1);
    }
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

  teleporting(isTeleporting) {
    this.setActive(!isTeleporting).setVisible(!isTeleporting);
    if (isTeleporting) {
      this.scene.physics.world.disable(this);
    } else {
      this.scene.physics.world.enable(this);
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

    // If the player is jumping or falling, set the animation
    // to the jump one.
    if (this.body.velocity.y !== 0) {
      this.anims.play(JUMP_ANIM, true);
    }
  }

  _handleProjectile() {
    if (this.keys.shift.isDown) {
      this.projectileTimer++;
    }

    if (
      this.keys.shift.isUp &&
      this.projectileTimer > 0 &&
      this.scene.projectileGroup.children.entries.length < 1
    ) {
      this._shootProjectile();
    }
  }

  _shootProjectile() {
    this.teleporting(true);
    this.scene.projectileGroup.add(
      new Projectile({
        scene: this.scene,
        x: this.x,
        y: this.y,
        direction: this.flipX ? "left" : "right",
        projectileTimer:
          this.projectileTimer > 20
            ? MAX_PROJECTILE_TIMER
            : this.projectileTimer
      })
    );
    this.projectileTimer = 0;
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
