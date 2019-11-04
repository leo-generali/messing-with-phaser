export const IDLE_ANIM = "player-anim/idle";
export const WALKING_ANIM_SIDE = "player-anim/run";
export const JUMP_ANIM = "player-anim/jump";
export const FALL_ANIM = "player-anim/fall";

export const setAnimations = scene => {
  // Idle animations
  scene.anims.create({
    key: IDLE_ANIM,
    frames: scene.anims.generateFrameNames(IDLE_ANIM),
    frameRate: 5
  });

  // Walking animations
  scene.anims.create({
    key: WALKING_ANIM_SIDE,
    frames: scene.anims.generateFrameNames(WALKING_ANIM_SIDE),
    repeat: -1
  });

  scene.anims.create({
    key: JUMP_ANIM,
    frames: scene.anims.generateFrameNames(JUMP_ANIM),
    repeat: -1
  });

  scene.anims.create({
    key: FALL_ANIM,
    frames: scene.anims.generateFrameNames(FALL_ANIM),
    repeat: -1
  });
};
