export const IDLE_ANIM = "player-anim/idle";
export const WALKING_ANIM = "player-anim/run";
export const JUMP_ANIM = "player-anim/jump";
export const FALL_ANIM = "player-anim/fall";
export const ROLLING_ANIM = "player-anim/roll";

export const setAnimations = scene => {
  // Idle animations
  scene.anims.create({
    key: IDLE_ANIM,
    frames: scene.anims.generateFrameNames("player-sprite/idle"),
    repeatDelay: 1000,
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

  scene.anims.create({
    key: JUMP_ANIM,
    frames: scene.anims.generateFrameNames("player-sprite/jump"),
    repeat: 1
  });

  // scene.anims.create({
  //   key: ROLLING_ANIM,
  //   frames: scene.anims.generateFrameNames(ROLLING_ANIM),
  //   frameRate: 15,
  //   repeat: -1
  // });

  // scene.anims.create({
  //   key: FALL_ANIM,
  //   frames: scene.anims.generateFrameNames(FALL_ANIM),
  //   repeat: -1
  // });
};
