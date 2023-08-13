const convertSecondsToDaysHours = (seconds) => {
  const SECONDS_IN_A_DAY = 24 * 60 * 60;
  const SECONDS_IN_AN_HOUR = 60 * 60;

  const days = Math.floor(seconds / SECONDS_IN_A_DAY);
  const remainingSeconds = seconds % SECONDS_IN_A_DAY;
  const hours = Math.floor(remainingSeconds / SECONDS_IN_AN_HOUR);

  return { days, hours };
}

export { convertSecondsToDaysHours }