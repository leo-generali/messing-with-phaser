export const calculateShootingVelocity = (
  velocityMin,
  velocityMax,
  projectileTimerCurrent,
  projectileTimerMax
) => {
  const velocityDifference = velocityMax - velocityMin;
  const projectileTimerPercentage =
    projectileTimerCurrent / projectileTimerMax > 1
      ? 1
      : projectileTimerCurrent / projectileTimerMax;

  console.log(projectileTimerPercentage, velocityDifference);

  return projectileTimerPercentage * velocityDifference + velocityMin;
};
