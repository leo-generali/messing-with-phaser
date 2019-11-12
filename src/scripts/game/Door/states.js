import State from "../../lib/State";
import { OPENING_ANIM, CLOSING_ANIM, IDLE_ANIM } from "./animations";

export class StartState extends State {
  enter({ sprite }) {
    sprite.anims.play(CLOSING_ANIM);
  }

  execute({ scene }) {
    if (scene.enemyGroup.children.entries.length === 0) {
      this.stateMachine.transition("open");
    }
  }
}

export class OpenState extends State {
  enter({ sprite }) {
    sprite.anims.play(OPENING_ANIM, true);
  }
}
