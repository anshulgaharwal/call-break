export const SPADE_SUIT = 0;

export const getSuit = (card) => Math.floor(card / 13);

export const getRankIndex = (card) => card % 13;

export const getRankStrength = (card) => 12 - getRankIndex(card);

export const sortHand = (hand = []) =>
  [...hand].sort((a, b) => {
    const suitDiff = getSuit(a) - getSuit(b);
    if (suitDiff !== 0) {
      return suitDiff;
    }

    return getRankIndex(a) - getRankIndex(b);
  });

export const canFollowSuit = (hand = [], leadSuit) =>
  hand.some((card) => getSuit(card) === leadSuit);

export const isValidPlay = ({ hand = [], currentTrick = [], card }) => {
  if (!hand.includes(card)) {
    return { valid: false, message: "Card not in hand" };
  }

  if (currentTrick.length === 0) {
    return { valid: true };
  }

  const leadSuit = getSuit(currentTrick[0].card);
  const playedSuit = getSuit(card);

  if (playedSuit !== leadSuit && canFollowSuit(hand, leadSuit)) {
    return {
      valid: false,
      message: "You must follow the lead suit if you can",
    };
  }

  return { valid: true };
};

export const determineTrickWinner = (currentTrick = []) => {
  if (currentTrick.length !== 4) {
    return null;
  }

  const leadSuit = getSuit(currentTrick[0].card);

  return currentTrick.reduce((winningPlay, play) => {
    const winningSuit = getSuit(winningPlay.card);
    const playSuit = getSuit(play.card);

    const winningIsTrump = winningSuit === SPADE_SUIT;
    const playIsTrump = playSuit === SPADE_SUIT;

    if (!winningIsTrump && playIsTrump) {
      return play;
    }

    if (winningIsTrump && !playIsTrump) {
      return winningPlay;
    }

    if (winningSuit === playSuit) {
      return getRankStrength(play.card) > getRankStrength(winningPlay.card)
        ? play
        : winningPlay;
    }

    if (winningSuit !== SPADE_SUIT && playSuit === leadSuit) {
      return getRankStrength(play.card) > getRankStrength(winningPlay.card)
        ? play
        : winningPlay;
    }

    return winningPlay;
  });
};
