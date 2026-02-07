export const getPositions = (players, me) => {
  const myIndex = players.indexOf(me);
  return players.map((p, i) => {
    const pos = (i - myIndex + players.length) % players.length;
    return { player: p, position: pos };
  });
};
