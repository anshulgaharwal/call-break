export const calculateRoundScore = (bid, tricksWon) => {
  if (typeof bid !== "number" || typeof tricksWon !== "number") {
    return 0;
  }

  if (tricksWon < bid) {
    return -bid;
  }

  return Number((bid + (tricksWon - bid) / 10).toFixed(1));
};

export const getLeaders = (scores = {}) => {
  const entries = Object.entries(scores);

  if (entries.length === 0) {
    return [];
  }

  const highestScore = Math.max(...entries.map(([, score]) => score));
  return entries
    .filter(([, score]) => score === highestScore)
    .map(([username]) => username);
};
