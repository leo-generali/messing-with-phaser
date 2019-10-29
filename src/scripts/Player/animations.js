export const IDLE_ANIM = "player-anim/idle";
export const WALKING_ANIM_SIDE = "player-anim/side-walking";

export const setAnimations = scene => {
  // Idle animations
  scene.anims.create({
    key: IDLE_ANIM,
    frames: scene.anims.generateFrameNames("player", {
      frames: [27]
    }),
    repeat: 1
  });

  // Walking animations
  scene.anims.create({
    key: WALKING_ANIM_SIDE,
    frames: scene.anims.generateFrameNames("player", {
      frames: [28, 27]
    }),
    frameRate: "6",
    repeat: -1
  });
};
