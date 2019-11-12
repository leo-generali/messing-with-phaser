import { GameObjects } from "phaser";

import { setAnimations } from "./animations";

import StateMachine from "../../lib/StateMachine";
import { StartState, OpenState } from "./states";

export default class extends GameObjects.Sprite {
  constructor({ scene, x, y }) {
    super(scene, x, y);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.body.setSize(46, 56).setOffset(0, 0);

    setAnimations(this.scene);

    this.scene.physics.add.collider(this, this.scene.backgroundLayer);

    this.stateMachine = new StateMachine(
      "start",
      {
        start: new StartState(),
        open: new OpenState()
      },
      { sprite: this, scene: this.scene }
    );
  }

  update() {
    this.stateMachine.step();
  }
}
