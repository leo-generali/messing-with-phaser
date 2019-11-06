export const IDLE_ANIM = "player-anim/idle";
export const WALKING_ANIM_SIDE = "player-anim/run";
export const JUMP_ANIM = "player-anim/jump";
export const FALL_ANIM = "player-anim/fall";
export const ROLLING_ANIM = "player-anim/roll";

export const setAnimations = scene => {
  // Idle animations
  scene.anims.create({
    key: IDLE_ANIM,
    frames: scene.anims.generateFrameNames(WALKING_ANIM_SIDE, {
      frames: 0
    })
  });

  // Walking animations
  scene.anims.create({
    key: WALKING_ANIM_SIDE,
    frames: scene.anims.generateFrameNames(WALKING_ANIM_SIDE, {
      frames: [1, 2, 3, 4]
    }),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: JUMP_ANIM,
    frames: scene.anims.generateFrameNames(JUMP_ANIM, {
      frames: 0
    }),
    repeat: -1
  });

  scene.anims.create({
    key: ROLLING_ANIM,
    frames: scene.anims.generateFrameNames(ROLLING_ANIM),
    frameRate: 15,
    repeat: -1
  });

  // scene.anims.create({
  //   key: FALL_ANIM,
  //   frames: scene.anims.generateFrameNames(FALL_ANIM),
  //   repeat: -1
  // });
};
