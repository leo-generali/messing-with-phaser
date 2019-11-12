export const IDLE_ANIM = "enemy-anim/idle";
export const WALKING_ANIM = "enemy-anim/run";

export const setAnimations = scene => {
  scene.anims.create({
    key: IDLE_ANIM,
    frames: scene.anims.generateFrameNames("player-sprite/idle", {
      frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0]
    }),
    repeatDelay: 1500,
    frameRate: 5.5,
    repeat: -1
  });
};
