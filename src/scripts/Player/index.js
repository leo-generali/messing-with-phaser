const IDLE_ANIM = "player-anim/idle";
const WALKING_ANIM = "player-anim/side-walking";
const VELOCITY = 32;

export default class {
  constructor(scene, x = 20, y = 20) {
    this.scene = scene;
    this.x = x;
    this.y = y;

    scene.anims.create({
      key: IDLE_ANIM,
      frames: scene.anims.generateFrameNames("player", {
        frames: [0, 4, 8, 12]
      }),
      frameRate: "8",
      repeat: -1
    });

    scene.anims.create({
      key: WALKING_ANIM,
      frames: scene.anims.generateFrameNames("player", {
        frames: [0, 4, 8, 12]
      }),
      frameRate: "16",
      repeat: -1
    });

    this.sprite = scene.physics.add.sprite(x, y, "player", 0);

    const { LEFT, RIGHT, UP, DOWN, SHIFT } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN,
      shift: SHIFT
    });
  }

  update() {
    // Stop player movement if no key is being pressed
    this.sprite.body.setVelocity(0);
    this.sprite.body.setCollideWorldBounds(true);
    const velocity = this.keys.shift.isDown ? VELOCITY + 16 : VELOCITY;

    // Handle
    if (this.keys.left.isDown) {
      this.sprite.setVelocityX(-velocity);
      this.sprite.anims.play(WALKING_ANIM, true);
    }
    if (this.keys.right.isDown) {
      this.sprite.setVelocityX(+velocity);
      this.sprite.anims.play(WALKING_ANIM, true);
    }
    if (this.keys.up.isDown) {
      this.sprite.setVelocityY(-velocity);
      this.sprite.anims.play(WALKING_ANIM, true);
    }
    if (this.keys.down.isDown) {
      this.sprite.setVelocityY(+velocity);
      this.sprite.anims.play(WALKING_ANIM, true);
    }

    if (
      this.sprite.body.velocity.x === 0 &&
      this.sprite.body.velocity.y === 0
    ) {
      this.sprite.anims.play(IDLE_ANIM, true);
    }
  }
}
