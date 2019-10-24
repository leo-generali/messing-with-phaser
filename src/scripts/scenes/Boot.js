import { Scene } from "phaser";

export default class extends Scene {
  constructor() {
    super("boot_scene");
  }

  create() {
    this.add.text(20, 20, "Loading game...");
  }
}
