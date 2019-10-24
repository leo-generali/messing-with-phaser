import { Scene } from "phaser";
import Player from "../Player";
import NPC from "../NPC";
import playerSpritesheet from "../../assets/sprites/player.png";
import npcSpritesheet from "../../assets/sprites/npc.png";

export default class extends Scene {
  constructor() {
    super("play_scene");
  }

  preload() {
    this.load.spritesheet("player", playerSpritesheet, {
      frameHeight: 8,
      frameWidth: 8
    });
    this.load.spritesheet("npc", npcSpritesheet, {
      frameHeight: 8,
      frameWidth: 8
    });
  }

  create() {
    this.npc = new NPC(this);
    this.player = new Player(this);
  }

  update(time, delta) {
    this.player.update();
    this.npc.update();
  }
}
