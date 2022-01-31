const generateRandomValue = (): number => {
  return Math.floor(Math.random() * 100);
};

const getSecondsFromMinutes = (minutes: number): number => {
  return minutes * 60;
};

export { generateRandomValue, getSecondsFromMinutes };
