// TODO: Game model/schema
import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    state: {
        /**
         * cards state in the game - object with key 0,1,2,3,4
         * 0 for cards in center
         * 1 for cards in player 1
         * 2 for cards in player 2
         * 3 for cards in player 3
         * 4 for cards in player 4
         * 
         */
        cards: { type: Object, default: {} }, 
        currentPlayer: { type: Number, default: 0 },
        
    },
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
