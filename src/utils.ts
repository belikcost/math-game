const generateRandomValue = (
  randomizeFunction: () => number,
  floorFunction: (arg0: number) => number
): number => {
  return floorFunction(randomizeFunction() * 100);
};

const getSecondsFromMinutes = (minutes: number): number => {
  return minutes * 60;
};

export { generateRandomValue, getSecondsFromMinutes };
