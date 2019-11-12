export const IDLE_ANIM = "player-anim/idle";
export const WALKING_ANIM = "player-anim/run";
export const JUMP_ANIM = "player-anim/jump";
export const STAGGER_ANIM = "player-anim/stagger";

export const setAnimations = scene => {
  // Idle animations
  scene.anims.create({
    key: IDLE_ANIM,
    frames: scene.anims.generateFrameNames("player-sprite/idle", {
      frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0]
    }),
    repeatDelay: 1500,
    frameRate: 5.5,
    repeat: -1
  });

  // Walking animations
  scene.anims.create({
    key: WALKING_ANIM,
    frames: scene.anims.generateFrameNames("player-sprite/run"),
    frameRate: 10,
    repeat: -1
  });

  // Jump animations
  scene.anims.create({
    key: JUMP_ANIM,
    frames: scene.anims.generateFrameNames("player-sprite/jump"),
    repeat: 1
  });

  // Jump animations
  scene.anims.create({
    key: STAGGER_ANIM,
    frames: scene.anims.generateFrameNames("player-sprite/stagger"),
    repeat: 3
  });
};
