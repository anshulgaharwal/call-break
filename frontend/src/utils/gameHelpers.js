export const getCurrentPlayer = (players = [], turnIndex = 0) =>
  players[turnIndex] || "";

export const getPlayerMapFromPerspective = (players = [], me) => {
  const myIndex = players.indexOf(me);

  if (myIndex === -1) {
    return {
      left: players[0] || "",
      top: players[1] || "",
      right: players[2] || "",
      bottom: players[3] || "",
    };
  }

  return {
    left: players[(myIndex + 1) % players.length] || "",
    top: players[(myIndex + 2) % players.length] || "",
    right: players[(myIndex + 3) % players.length] || "",
    bottom: players[myIndex] || "",
  };
};

export const sumCardsRemaining = (hands = {}) =>
  Object.values(hands).reduce((total, hand) => total + hand.length, 0);
