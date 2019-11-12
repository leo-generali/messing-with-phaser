export const OPENING_ANIM = "door-anim/opening";
export const IDLE_ANIM = "door-anim/idle";
export const CLOSING_ANIM = "door-anim/closing";

export const setAnimations = scene => {
  scene.anims.create({
    key: OPENING_ANIM,
    frames: scene.anims.generateFrameNames("door-sprite/all", {
      frames: [2, 1, 0]
    }),
    frameRate: 1
  });

  scene.anims.create({
    key: IDLE_ANIM,
    frames: scene.anims.generateFrameNames("door-sprite/all")
  });

  scene.anims.create({
    key: CLOSING_ANIM,
    frames: scene.anims.generateFrameNames("door-sprite/all"),
    frameRate: 1
  });
};
