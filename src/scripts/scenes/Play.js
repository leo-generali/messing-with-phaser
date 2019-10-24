import { Scene } from "phaser";
import { join } from "path";
import marioTileset from "../../assets/tilesets/mario-tiles.png";

export default class extends Scene {
  constructor() {
    super("play_scene");
  }

  preload() {
    this.load.image(
      "tiles",
      marioTileset
      // "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/tilesets/super-mario-tiles.png"
    );
  }

  create() {
    const level = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 2, 3, 0, 0, 0, 1, 2, 3, 0],
      [0, 5, 6, 7, 0, 0, 0, 5, 6, 7, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 14, 13, 14, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 14, 14, 14, 14, 14, 0, 0, 0, 15],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15],
      [35, 36, 37, 0, 0, 0, 0, 0, 15, 15, 15],
      [39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39]
    ];

    // When loading from an array, make sure to specify the tileWidth and tileHeight
    const map = this.make.tilemap({
      data: level,
      tileWidth: 16,
      tileHeight: 16
    });
    const tiles = map.addTilesetImage("tiles");
    const layer = map.createStaticLayer(0, tiles, 0, 0);
  }
}
