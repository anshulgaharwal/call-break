# Call Break Game - Frontend

This is the React frontend for the Call Break card game.

## Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`

## Folder Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/           # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Loading.jsx
│   │   ├── game/             # Game-specific components
│   │   │   ├── Card.jsx
│   │   │   ├── Hand.jsx
│   │   │   ├── Table.jsx
│   │   │   ├── PlayerInfo.jsx
│   │   │   ├── Scoreboard.jsx
│   │   │   └── BidSelector.jsx
│   │   └── lobby/            # Lobby components
│   │       ├── RoomCard.jsx
│   │       ├── RoomList.jsx
│   │       └── CreateRoom.jsx
│   ├── context/              # React contexts
│   │   ├── AuthContext.jsx
│   │   ├── GameContext.jsx
│   │   └── SocketContext.jsx
│   ├── hooks/                # Custom hooks
│   │   ├── useAuth.js
│   │   ├── useGame.js
│   │   └── useSocket.js
│   ├── pages/                # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Lobby.jsx
│   │   ├── Game.jsx
│   │   └── Profile.jsx
│   ├── services/             # API and socket services
│   │   ├── api.js
│   │   └── socket.js
│   ├── styles/               # CSS styles
│   │   ├── components/
│   │   │   ├── Card.css
│   │   │   └── Table.css
│   │   └── pages/
│   │       ├── Game.css
│   │       └── Lobby.css
│   └── utils/                # Utility functions
│       ├── constants.js
│       └── gameHelpers.js
├── public/
└── index.html
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
