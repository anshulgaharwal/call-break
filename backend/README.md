# Call Break Game - Backend

This is the Express.js backend for the Call Break card game.

## Getting Started

1. Copy `.env.example` to `.env` and configure your environment variables
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## Folder Structure

```
backend/
├── src/
│   ├── index.js          # Entry point
│   ├── config/           # Configuration files
│   │   ├── database.js   # Database connection
│   │   └── socket.js     # Socket.io configuration
│   ├── controllers/      # Route controllers
│   │   ├── gameController.js
│   │   ├── userController.js
│   │   └── roomController.js
│   ├── middleware/       # Custom middleware
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/           # Data models
│   │   ├── User.js
│   │   ├── Game.js
│   │   └── Room.js
│   ├── routes/           # API routes
│   │   ├── gameRoutes.js
│   │   ├── userRoutes.js
│   │   └── roomRoutes.js
│   ├── services/         # Business logic
│   │   ├── gameService.js
│   │   ├── userService.js
│   │   └── roomService.js
│   └── utils/            # Utility functions
│       ├── cardUtils.js
│       └── scoreUtils.js
└── .env.example          # Environment variables template
```

## API Endpoints (TODO)

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/rooms` - Get available rooms
- `POST /api/rooms` - Create a new room
- `POST /api/rooms/:id/join` - Join a room
- `GET /api/game/:id` - Get game state
