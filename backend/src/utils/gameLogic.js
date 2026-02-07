

export const analyzeGame = (hands, centerPile, currentUser) => {
    const validMoves = [];
    const firstCard = centerPile[0];
    const firstCardSuit = Math.floor(firstCard.card / 13);

    const centerHasSpade = centerPile.some(card => Math.floor(card.card / 13) === 0);

    const bestSpadeCard = centerPile.reduce((best, card) => {
        if (Math.floor(card.card / 13) === 0) {
            return card.card % 13 < best ? card.card % 13 : best;
        }
        return best;
    }, 12);

    const bestSuitCard = centerPile.reduce((best, card) => {
        if (Math.floor(card.card / 13) === firstCardSuit) {
            return card.card % 13 < best ? card.card % 13 : best;
        }
        return best;
    }, 12);

    const hasSpade = hands[currentUser].some(card => Math.floor(card / 13) === 0);
    const hasCard = hands[currentUser].some(card => Math.floor(card / 13) === firstCardSuit);

    if (hasCard) {
        if (centerHasSpade) { //push all cards user have from first card suit
            validMoves.push(...hands[currentUser].filter(card => Math.floor(card / 13) === firstCardSuit));
        } 
        else { // push all cards user have from first card suit lower than bestSuitCard
            validMoves.push(...hands[currentUser].filter(card => Math.floor(card / 13) === firstCardSuit && card % 13 < bestSuitCard));
            if (validMoves.length === 0) {
                validMoves.push(...hands[currentUser].filter(card => Math.floor(card / 13) === firstCardSuit));
            }
        }
    }
    else if (hasSpade) {
        if (centerHasSpade) { //push all cards user have from spade lower than bestSpadeCard
            validMoves.push(...hands[currentUser].filter(card => Math.floor(card / 13) === 0 && card % 13 < bestSpadeCard));
            if (validMoves.length === 0) {
                validMoves.push(...hands[currentUser].filter(card => Math.floor(card / 13) === 0));
            }
        }
        else { // push all cards user have from spade
            validMoves.push(...hands[currentUser].filter(card => Math.floor(card / 13) === 0));
        }
    }
    else {
        // push all cards user have
        validMoves.push(...hands[currentUser]);
    }
    
}

certerPileWinner = (centerPile) => {
    const centerHasSpade = centerPile.some(card => Math.floor(card.card / 13) === 0);
    if (centerHasSpade) {
        return centerPile.reduce((best, card) => {
            if (Math.floor(card.card / 13) === 0) {
                return card.card % 13 < best ? card.card % 13 : best;
            }
            return best.username;
        }, 12);
    }
    return centerPile.reduce((best, card) => {
        if (Math.floor(card.card / 13) === firstCardSuit) {
            return card.card % 13 < best ? card.card % 13 : best;
        }
        return best.username;
    }, 12);
}