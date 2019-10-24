export default class {
  constructor(scene, x = 20, y = 20) {
    this.scene = scene;
    this.x = x;
    this.y = y;

    scene.anims.create({
      key: "play_idle",
      frames: scene.anims.generateFrameNumbers("player"),
      frameRate: "10",
      repeat: -1
    });

    this.sprite = scene.physics.add.sprite(x, y, "player", 0);

    const { LEFT, RIGHT, UP, DOWN } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN
    });
  }

  update() {
    this.sprite.anims.play("play_idle", true);

    this.sprite.body.setVelocity(0);

    if (this.keys.left.isDown) this.sprite.setVelocityX(-32);
    if (this.keys.right.isDown) this.sprite.setVelocityX(+32);
    if (this.keys.up.isDown) this.sprite.setVelocityY(-32);
    if (this.keys.down.isDown) this.sprite.setVelocityY(+32);
  }
}
