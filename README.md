# Call Break

Call Break is a full-stack multiplayer card game project built with React on the frontend and Express, MongoDB, and Socket.IO on the backend. Players can create accounts, open or join rooms, invite other users, and play a real-time four-player card match.

## Overview

The app is split into two folders:

- `frontend/`: Vite + React client
- `backend/`: Express API, MongoDB models, and Socket.IO server

The current implementation already supports:

- User registration and login with JWT-based authentication
- Room creation and joining
- Optional room passwords
- Player invitations
- Lobby management for up to 4 players
- Starting a game when the room is full
- Card distribution
- Real-time card play updates over Socket.IO

## Tech Stack

- Frontend: React 19, Vite, Framer Motion, Lucide React, Socket.IO Client
- Backend: Node.js, Express 5, MongoDB, Mongoose, Socket.IO
- Auth: JWT + bcrypt

## Project Structure

```text
call-break/
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |-- context/
|   |   |-- pages/
|   |   |-- services/
|   |   `-- utils/
|   |-- public/
|   `-- package.json
|-- backend/
|   |-- src/
|   |   |-- config/
|   |   |-- controllers/
|   |   |-- middleware/
|   |   |-- models/
|   |   |-- routes/
|   |   `-- utils/
|   `-- package.json
`-- README.md
```

## How The App Works

1. A user signs up or logs in from the animated auth screen.
2. After authentication, the user lands in the main home flow.
3. From there, they can:
   - view invitations
   - create a room
   - join a room by ID
4. Private rooms require password verification before entry.
5. Inside the lobby, the room admin can:
   - invite other users
   - remove players
   - start the game once 4 players are present
6. In the game view, the admin distributes cards and players take turns playing cards.
7. Card plays are broadcast in real time through Socket.IO.

## Backend Responsibilities

The backend currently exposes routes for:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `POST /api/room/create`
- `POST /api/room/join`
- `POST /api/room/delete`
- `POST /api/room/verify-password`
- `POST /api/room/remove-player`
- `GET /api/room/:roomId`
- `POST /api/room/start`
- `POST /api/room/play`
- `POST /game/distribute`
- invitation create, accept, reject, fetch, and delete routes under `/api/invitation`

The main persisted models are:

- `User`
- `Room`
- `Invitation`

`Room` stores the live game state, including:

- room members
- admin username
- whether the game has started
- each player's hand
- current turn index
- cards in the center pile

## Frontend Responsibilities

The frontend is a single-flow React app driven by auth state and a tab-like home screen. Important areas include:

- `AuthContext` for login, registration, token persistence, and profile bootstrapping
- `Home.jsx` for switching between invitations, room creation, room joining, lobby, and game views
- `services/api.js` for REST API calls
- `socket.js` for the Socket.IO client connection
- `pages/Game.jsx` for the real-time table UI

## Local Development

### Prerequisites

- Node.js 18+
- npm
- MongoDB instance

### 1. Clone and install

Frontend:

```bash
cd frontend
npm install
```

Backend:

```bash
cd backend
npm install
```

### 2. Configure environment variables

Create a `.env` file inside `backend/` with at least:

```env
MONGODB_URI=mongodb://localhost:27017/call-break
JWT_SECRET=replace_this_with_a_secure_secret
PORT=5000
```

### 3. Start the backend

```bash
cd backend
npm run dev
```

### 4. Start the frontend

```bash
cd frontend
npm run dev
```

By default, the frontend expects the backend at `http://localhost:5000` and the Vite app at `http://localhost:5173`.

## Notes About The Current Implementation

This project is already playable at a basic level, but it is still in an in-progress state. While reviewing the codebase, these limitations stood out:

- API and socket URLs are hardcoded to localhost instead of using environment-based config
- there are no automated tests yet
- lobby and invitation refresh mostly rely on polling every 5 seconds
- the gameplay flow currently covers room setup, card dealing, and turn-based play, but not the full Call Break ruleset like bid scoring, trick resolution, or round summaries
- some files still contain TODO comments or scaffolding left from earlier development

## Possible Next Improvements

- move frontend API/socket endpoints to environment variables
- implement full trick evaluation and score calculation
- add bidding/call mechanics
- improve authorization and room cleanup behavior
- add tests for auth, room, and game flows
- add deployment-ready configs for frontend and backend

## Scripts

Frontend:

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run preview`

Backend:

- `npm run dev`
- `npm start`

## Summary

This repo is a strong base for an online Call Break game: auth works, rooms work, invitations work, and the game state already updates in real time. The biggest remaining work is turning the existing playable prototype into a complete rules-accurate game and making configuration and testing production-ready.
