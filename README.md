# Call Break Card Game

A full-stack Call Break (also known as Call Bridge) card game application.

## Project Structure

```
callBreak/
├── frontend/     # React frontend (Vite)
├── backend/      # Express.js backend
└── README.md     # This file
```

## Getting Started

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Tech Stack

- **Frontend**: React, Vite
- **Backend**: Express.js, Node.js
- **Real-time**: Socket.io (to be implemented)

## Game Rules (Call Break)

Call Break is a trick-taking card game for 4 players using a standard 52-card deck.

1. Each player is dealt 13 cards
2. Players bid (call) the number of tricks they will win
3. Spades are always trump
4. Players must follow suit if possible
5. Score is calculated based on bids and tricks won
