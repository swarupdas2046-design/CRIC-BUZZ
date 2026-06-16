# 🏏 Cricbuzz Project - Cricket Management Platform

A **full-stack cricket management application** inspired by Cricbuzz, featuring comprehensive match management, player statistics, team administration, and live scoring capabilities. Built with modern technologies and industry best practices.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation)
- [Database Models](#database-models)
- [User Roles & Permissions](#user-roles--permissions)
- [Middleware](#middleware)
- [Installation & Running](#installation--running)
- [Environment Variables](#environment-variables)
- [Development Guide](#development-guide)

---

## 🎯 Project Overview

**Cricbuzz Project** is a comprehensive cricket management platform that allows administrators, scorers, and users to manage cricket tournaments, matches, teams, and player statistics. The application provides real-time match scoring, tournament management, and public match information.

### Core Capabilities:

- ✅ User authentication (Registration, Login, Google OAuth)
- ✅ Multi-role based access control (SUPER_ADMIN, ADMIN, SCORER, USER)
- ✅ Tournament/Series management
- ✅ Team and Player management
- ✅ Match creation and management
- ✅ Live scoring system
- ✅ Real-time updates via Socket.io
- ✅ Public match feed (without authentication)
- ✅ Squad management per team

---

## 🛠 Technology Stack

### **Backend**

| Technology       | Version        | Purpose                       |
| ---------------- | -------------- | ----------------------------- |
| **Node.js**      | 18+            | JavaScript Runtime            |
| **Express**      | 5.2.1          | Web Framework                 |
| **MongoDB**      | 9.7.0          | NoSQL Database (via Mongoose) |
| **JWT**          | 9.0.3          | Authentication (Tokens)       |
| **Passport.js**  | 0.7.0          | Authentication Strategy       |
| **Bcrypt**       | 6.0.0          | Password Hashing              |
| **Socket.io**    | 4.8.3          | Real-time Communication       |
| **Joi/Zod**      | 18.2.1 / 4.4.3 | Data Validation               |
| **Helmet**       | 8.2.0          | Security Headers              |
| **Pino**         | 10.3.1         | Logging                       |
| **Morgan**       | 1.11.0         | HTTP Logging                  |
| **Multer**       | 2.1.1          | File Upload                   |
| **CORS**         | 2.8.6          | Cross-Origin Support          |
| **Compression**  | 1.8.1          | Response Compression          |
| **Rate Limiter** | 8.5.2          | API Rate Limiting             |

### **Frontend**

| Technology          | Version | Purpose                 |
| ------------------- | ------- | ----------------------- |
| **React**           | 19.2.0  | UI Framework            |
| **React Router**    | 7.17.0  | Client-side Routing     |
| **Redux Toolkit**   | 2.12.0  | State Management        |
| **React Query**     | 5.101.0 | Server State Management |
| **Axios**           | 1.18.0  | HTTP Client             |
| **React Hook Form** | 7.79.0  | Form Management         |
| **Tailwind CSS**    | 4.3.1   | CSS Framework           |
| **Lucide React**    | 1.18.0  | Icon Library            |
| **Vite**            | 7.2.4   | Build Tool              |

---

## ✨ Features

### Authentication & Authorization

- User Registration with email validation
- Secure Login with JWT tokens
- Google OAuth 2.0 integration
- Role-based access control (RBAC)
- Protected routes for authenticated users

### Tournament Management

- Create, read, update, delete series (tournaments)
- Tournament scheduling
- Admin dashboard for tournament management

### Team Management

- Team creation and management
- Team profile customization
- Squad roster management
- Team statistics

### Player Management

- Player creation and database
- Player statistics tracking
- Player profile management
- Performance metrics

### Match Management

- Create and schedule matches
- Update match details
- Set match toss information
- Define playing XI
- Match status tracking
- Complete match with results

### Live Scoring

- Real-time score updates
- Ball-by-ball commentary
- Player performance tracking
- Match statistics
- Socket.io powered real-time updates

### Public Features

- Public home feed with match information
- Live match display
- Upcoming matches
- Recent match results
- No authentication required

---

## 📁 Project Structure

```
Cricbuzz-Project/
├── README.md
├── Client/                          # React Frontend Application
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── index.html
│   ├── public/                      # Static files
│   └── src/
│       ├── main.jsx                 # Entry point
│       ├── App.jsx                  # Root component
│       ├── App.css
│       ├── index.css
│       ├── api/                     # API integration layer
│       │   ├── auth.js             # Authentication API calls
│       │   ├── home.js             # Home page API calls
│       │   ├── matches.js          # Match API calls
│       │   ├── players.js          # Player API calls
│       │   ├── series.js           # Series/Tournament API calls
│       │   └── teams.js            # Team API calls
│       ├── assets/                  # Image & media assets
│       ├── components/              # Reusable React components
│       │   ├── Navbar.jsx          # Navigation header
│       │   ├── ProtectedRoute.jsx  # Auth-protected routes
│       │   ├── PublicRoute.jsx     # Public access routes
│       │   ├── admin/              # Admin components
│       │   │   ├── Sidebar.jsx     # Admin sidebar navigation
│       │   │   └── Topbar.jsx      # Admin top bar
│       │   ├── matches/            # Match-related components
│       │   │   ├── MatchFormModal.jsx
│       │   │   ├── MatchStatusBadge.jsx
│       │   │   └── matchStatus.js
│       │   ├── players/            # Player-related components
│       │   │   └── PlayerFormModal.jsx
│       │   ├── teams/              # Team-related components
│       │   │   └── TeamFormModal.jsx
│       │   └── ui/                 # Shared UI components
│       │       ├── Modal.jsx
│       │       ├── ConfirmDeleteModal.jsx
│       │       └── StatusBadge.jsx
│       ├── hooks/                   # Custom React hooks
│       │   ├── useAuth.js          # Authentication logic
│       │   ├── useDashboard.js     # Dashboard state
│       │   ├── useHome.js          # Home page logic
│       │   ├── useLogout.js        # Logout logic
│       │   ├── useMatches.js       # Match operations
│       │   ├── usePlayers.js       # Player operations
│       │   ├── useSeries.js        # Series operations
│       │   └── useTeams.js         # Team operations
│       ├── layout/                  # Layout components
│       │   ├── AdminLayout.jsx     # Admin dashboard layout
│       │   └── AppLayout.jsx       # Main app layout
│       ├── lib/                     # Utility libraries
│       │   ├── axios.js            # Axios instance with interceptors
│       │   ├── queryClient.js      # React Query configuration
│       │   └── store.js            # Redux store configuration
│       ├── pages/                   # Page components
│       │   ├── public/             # Public pages (no auth required)
│       │   │   ├── Home.jsx        # Public home page
│       │   │   ├── Login.jsx       # Login page
│       │   │   ├── Register.jsx    # Registration page
│       │   │   └── PublicMatchCard.jsx
│       │   └── private/            # Protected pages (auth required)
│       │       ├── AdminHome.jsx   # Admin dashboard
│       │       ├── LiveScoring.jsx # Live scoring interface
│       │       ├── Matches.jsx     # Match management
│       │       ├── Players.jsx     # Player management
│       │       ├── Teams.jsx       # Team management
│       │       ├── Tournaments.jsx # Tournament/Series management
│       │       └── Users.jsx       # User management
│       ├── services/                # Service layer
│       │   └── authService.js      # Auth service logic
│       ├── slices/                  # Redux slices
│       │   └── userSlice.jsx       # User state management
│       └── utils/                   # Utility functions
│           ├── authStorage.js      # Token storage management
│           ├── env.js              # Environment configuration
│           └── exportCsv.js        # CSV export utility
│
└── Server/                          # Node.js Backend Application
    ├── package.json
    └── src/
        ├── app.js                  # Express app setup & routes
        ├── server.js               # Server initialization & Socket.io
        ├── config/                 # Configuration files
        │   ├── env.js              # Environment variables
        │   └── logger.js           # Pino logger configuration
        ├── constant/               # Application constants
        │   ├── app.constant.js     # App-level constants
        │   └── model.constant.js   # Model constants (ROLES, STATUS)
        ├── database/               # Database configuration
        │   └── mongodb.js          # MongoDB connection
        ├── middleware/             # Express middleware
        │   ├── auth.middleware.js          # JWT authentication
        │   ├── errorHandler.middleware.js  # Global error handling
        │   ├── googleOAuth.middleware.js   # Google OAuth setup
        │   ├── notFound.middleware.js      # 404 handler
        │   ├── security.middleware.js      # Security headers
        │   ├── validate.middleware.js      # Request validation
        │   └── validateObjectId.middleware.js  # MongoDB ID validation
        ├── model/                  # Database models
        │   └── user.model.js       # User schema & model
        ├── modules/                # Feature modules (MVC structure)
        │   ├── public/             # Public API routes
        │   │   ├── auth/           # Authentication module
        │   │   │   ├── auth.controller.js    # Auth logic
        │   │   │   ├── auth.route.js        # Auth endpoints
        │   │   │   ├── auth.validator.js    # Input validation
        │   │   │   └── auth.service.js      # Auth service
        │   │   ├── home/           # Public home feed
        │   │   │   ├── controller.js
        │   │   │   ├── route.js
        │   │   │   └── service.js
        │   │   ├── series/         # Public series data
        │   │   ├── match/          # Public match data
        │   │   ├── player/         # Public player data
        │   │   ├── team/           # Public team data
        │   │   ├── cache/          # Caching layer
        │   │   ├── shared/         # Shared utilities
        │   │   └── index.js        # Public routes aggregator
        │   ├── users/              # User management module
        │   │   ├── user.controller.js
        │   │   ├── user.route.js
        │   │   ├── user.service.js
        │   │   ├── user.repository.js
        │   │   ├── user.model.js
        │   │   └── validators/
        │   ├── series/             # Tournament/Series module
        │   │   ├── series.controller.js
        │   │   ├── series.route.js
        │   │   ├── series.service.js
        │   │   ├── series.repository.js
        │   │   ├── series.model.js
        │   │   └── validators/
        │   ├── match/              # Match module
        │   │   ├── match.controller.js
        │   │   ├── match.route.js
        │   │   ├── match.service.js
        │   │   ├── match.repository.js
        │   │   ├── match.model.js
        │   │   └── validators/
        │   ├── team/               # Team module
        │   │   ├── team.controller.js
        │   │   ├── team.route.js
        │   │   ├── team.service.js
        │   │   ├── team.repository.js
        │   │   ├── team.model.js
        │   │   └── validators/
        │   ├── player/             # Player module
        │   │   ├── player.controller.js
        │   │   ├── player.route.js
        │   │   ├── player.service.js
        │   │   ├── player.repository.js
        │   │   ├── player.model.js
        │   │   └── validators/
        │   ├── score/              # Live scoring module
        │   │   ├── score.controller.js
        │   │   ├── score.route.js
        │   │   ├── score.service.js
        │   │   ├── score.repository.js
        │   │   ├── score.model.js
        │   │   └── validators/
        │   ├── squad/              # Squad management module
        │   │   ├── squad.controller.js
        │   │   ├── squad.route.js
        │   │   ├── squad.model.js
        │   │   └── squad.repository.js
        │   └── commentary/         # Match commentary module
        │       ├── commentary.controller.js
        │       ├── commentary.route.js
        │       ├── commentary.model.js
        │       └── commentary.repository.js
        ├── repository/             # Generic repository pattern
        │   └── user.repository.js
        ├── seed/                   # Database seeding
        │   └── seedSuperAdmin.js   # Initialize super admin
        └── shared/                 # Shared utilities & helpers
            ├── error/              # Custom error classes
            └── utils/              # Utility functions
```

---

## 🚀 Backend Setup

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or cloud)
- Postman or similar API testing tool

### Installation

```bash
# Navigate to Server directory
cd Server

# Install dependencies
npm install

# Create .env file
cp .env.example .env  # or create manually

# Start development server
npm run dev
```

---

## 🎨 Frontend Setup

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Navigate to Client directory
cd Client

# Install dependencies
npm install

# Create .env file
cp .env.example .env  # or create manually

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

---

## 🔌 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": {
    /* actual data */
  },
  "message": "Operation successful"
}
```

---

### 🔐 Authentication Routes

#### 1. **Register User**

- **Endpoint:** `POST /auth/register`
- **Auth Required:** ❌ No
- **Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

- **Response:** `{ token, user: { id, name, email, role } }`

#### 2. **Login User**

- **Endpoint:** `POST /auth/login`
- **Auth Required:** ❌ No
- **Request Body:**

```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

- **Response:** `{ token, user: { id, name, email, role } }`

#### 3. **Google OAuth Callback**

- **Endpoint:** `GET /auth/google`
- **Auth Required:** ❌ No
- **Redirects to:** Google OAuth login

#### 4. **Google OAuth Callback Handler**

- **Endpoint:** `GET /auth/google/callback`
- **Auth Required:** ❌ No
- **Purpose:** Handles Google OAuth response

#### 5. **Logout User**

- **Endpoint:** `POST /auth/logout`
- **Auth Required:** ✅ Yes
- **Response:** `{ message: "Logged out successfully" }`

---

### 👥 User Management Routes

#### 1. **Get All Users**

- **Endpoint:** `GET /users`
- **Auth Required:** ✅ Yes
- **Roles:** `SUPER_ADMIN`, `ADMIN`
- **Query Params:** `page`, `limit`, `search`
- **Response:** `[ { id, name, email, role, picture } ]`

#### 2. **Get User by ID**

- **Endpoint:** `GET /users/:id`
- **Auth Required:** ✅ Yes
- **Roles:** `SUPER_ADMIN`, `ADMIN`
- **Response:** `{ id, name, email, role, picture, timestamps }`

#### 3. **Update User**

- **Endpoint:** `PATCH /users/:id`
- **Auth Required:** ✅ Yes
- **Roles:** `SUPER_ADMIN`, `ADMIN`
- **Request Body:**

```json
{
  "name": "Updated Name",
  "picture": "https://url-to-image.jpg"
}
```

#### 4. **Change User Role**

- **Endpoint:** `PATCH /users/:id/role`
- **Auth Required:** ✅ Yes
- **Roles:** `SUPER_ADMIN` only
- **Request Body:**

```json
{
  "role": "ADMIN" // Can be: SUPER_ADMIN, ADMIN, SCORER, USER
}
```

#### 5. **Delete User**

- **Endpoint:** `DELETE /users/:id`
- **Auth Required:** ✅ Yes
- **Roles:** `SUPER_ADMIN` only
- **Response:** `{ message: "User deleted successfully" }`

---

### 🏆 Series/Tournament Routes

#### 1. **Get All Series**

- **Endpoint:** `GET /series`
- **Auth Required:** ✅ Yes
- **Roles:** `ADMIN`, `SUPER_ADMIN`
- **Response:** `[ { id, name, startDate, endDate, matches } ]`

#### 2. **Get Series by ID**

- **Endpoint:** `GET /series/:id`
- **Auth Required:** ✅ Yes
- **Roles:** `ADMIN`, `SUPER_ADMIN`

#### 3. **Create Series**

- **Endpoint:** `POST /series`
- **Auth Required:** ✅ Yes
- **Roles:** `ADMIN`, `SUPER_ADMIN`
- **Request Body:**

```json
{
  "name": "IPL 2024",
  "startDate": "2024-03-23",
  "endDate": "2024-05-26",
  "format": "T20"
}
```

#### 4. **Update Series**

- **Endpoint:** `PATCH /series/:id`
- **Auth Required:** ✅ Yes
- **Roles:** `ADMIN`, `SUPER_ADMIN`

#### 5. **Delete Series**

- **Endpoint:** `DELETE /series/:id`
- **Auth Required:** ✅ Yes
- **Roles:** `ADMIN`, `SUPER_ADMIN`

---

### 🎯 Match Routes

#### 1. **Get All Matches**

- **Endpoint:** `GET /matches`
- **Auth Required:** ✅ Yes
- **Roles:** `ADMIN`, `SUPER_ADMIN`
- **Response:** `[ { id, series, team1, team2, date, status, venue } ]`

#### 2. **Get Match by ID**

- **Endpoint:** `GET /matches/:id`
- **Auth Required:** ✅ Yes
- **Roles:** `ADMIN`, `SUPER_ADMIN`

#### 3. **Create Match**

- **Endpoint:** `POST /matches`
- **Auth Required:** ✅ Yes
- **Roles:** `ADMIN`, `SUPER_ADMIN`
- **Request Body:**

```json
{
  "seriesId": "series_id_here",
  "team1Id": "team1_id_here",
  "team2Id": "team2_id_here",
  "matchDate": "2024-03-25",
  "venue": "Wankhede Stadium",
  "format": "T20"
}
```

#### 4. **Update Match**

- **Endpoint:** `PATCH /matches/:id`
- **Auth Required:** ✅ Yes
- **Roles:** `ADMIN`, `SUPER_ADMIN`

#### 5. **Set Toss**

- **Endpoint:** `PATCH /matches/:id/toss`
- **Auth Required:** ✅ Yes
- **Roles:** `ADMIN`, `SUPER_ADMIN`
- **Request Body:**

```json
{
  "tossWinner": "team1_id",
  "electedTo": "bat" // or "field"
}
```

#### 6. **Set Playing XI**

- **Endpoint:** `PATCH /matches/:id/playing-xi`
- **Auth Required:** ✅ Yes
- **Roles:** `ADMIN`, `SUPER_ADMIN`
- **Request Body:**

```json
{
  "team1PlayingXI": ["player_id_1", "player_id_2", ...],
  "team2PlayingXI": ["player_id_1", "player_id_2", ...]
}
```

#### 7. **Delete Match**

- **Endpoint:** `DELETE /matches/:id`
- **Auth Required:** ✅ Yes
- **Roles:** `ADMIN`, `SUPER_ADMIN`

---

### 👨‍🏫 Player Routes

#### 1. **Get All Players**

- **Endpoint:** `GET /players`
- **Auth Required:** ✅ Yes
- **Roles:** `ADMIN`, `SUPER_ADMIN`
- **Response:** `[ { id, name, role, battingStyle, bowlingStyle, stats } ]`

#### 2. **Get Player by ID**

- **Endpoint:** `GET /players/:id`
- **Auth Required:** ✅ Yes
- **Roles:** `ADMIN`, `SUPER_ADMIN`

#### 3. **Create Player**

- **Endpoint:** `POST /players`
- **Auth Required:** ✅ Yes
- **Roles:** `ADMIN`, `SUPER_ADMIN`
- **Request Body:**

```json
{
  "name": "Virat Kohli",
  "role": "Batsman",
  "battingStyle": "Right-handed",
  "bowlingStyle": "Right-arm fast",
  "jerseyNumber": 18,
  "picture": "https://url-to-image.jpg"
}
```

#### 4. **Update Player**

- **Endpoint:** `PATCH /players/:id`
- **Auth Required:** ✅ Yes
- **Roles:** `ADMIN`, `SUPER_ADMIN`

#### 5. **Delete Player**

- **Endpoint:** `DELETE /players/:id`
- **Auth Required:** ✅ Yes
- **Roles:** `ADMIN`, `SUPER_ADMIN`

---

### 🏢 Team Routes

#### 1. **Get All Teams**

- **Endpoint:** `GET /teams`
- **Auth Required:** ✅ Yes
- **Roles:** `ADMIN`, `SUPER_ADMIN`
- **Response:** `[ { id, name, city, captain, players, logo } ]`

#### 2. **Get Team by ID**

- **Endpoint:** `GET /teams/:id`
- **Auth Required:** ✅ Yes
- **Roles:** `ADMIN`, `SUPER_ADMIN`

#### 3. **Create Team**

- **Endpoint:** `POST /teams`
- **Auth Required:** ✅ Yes
- **Roles:** `ADMIN`, `SUPER_ADMIN`
- **Request Body:**

```json
{
  "name": "Mumbai Indians",
  "city": "Mumbai",
  "captain": "player_id_here",
  "logo": "https://url-to-logo.jpg"
}
```

#### 4. **Update Team**

- **Endpoint:** `PATCH /teams/:id`
- **Auth Required:** ✅ Yes
- **Roles:** `ADMIN`, `SUPER_ADMIN`

#### 5. **Delete Team**

- **Endpoint:** `DELETE /teams/:id`
- **Auth Required:** ✅ Yes
- **Roles:** `ADMIN`, `SUPER_ADMIN`

#### 6. **Squad Management (Nested Route)**

- **Endpoint:** `GET /teams/:teamId/squad`
- **Auth Required:** ✅ Yes
- **Roles:** `ADMIN`, `SUPER_ADMIN`
- **Response:** `[ { playerId, playerName, role, jerseyNumber } ]`

---

### 📊 Scoring Routes

#### 1. **Create Score Entry**

- **Endpoint:** `POST /scores`
- **Auth Required:** ✅ Yes
- **Roles:** `SUPER_ADMIN`, `SCORER`
- **Request Body:**

```json
{
  "matchId": "match_id_here",
  "playerId": "player_id_here",
  "runs": 35,
  "balls": 25,
  "fours": 3,
  "sixes": 1
}
```

#### 2. **Update Score**

- **Endpoint:** `PATCH /scores/:id`
- **Auth Required:** ✅ Yes
- **Roles:** `SUPER_ADMIN`, `SCORER`

#### 3. **Get Scores for Match**

- **Endpoint:** `GET /scores/match/:matchId`
- **Auth Required:** ✅ Yes
- **Roles:** `SUPER_ADMIN`, `SCORER`

---

### 📢 Commentary Routes

#### Available Endpoints:

- `POST /commentary` - Create commentary entry
- `GET /commentary/match/:matchId` - Get match commentary
- `PATCH /commentary/:id` - Update commentary

---

### 🌐 Public API Routes (No Authentication Required)

#### 1. **Get Home Feed**

- **Endpoint:** `GET /public/home`
- **Auth Required:** ❌ No
- **Response:**

```json
{
  "liveMatches": [ { id, team1, team2, status, score } ],
  "upcomingMatches": [ { id, team1, team2, date, venue } ],
  "recentMatches": [ { id, team1, team2, result, date } ]
}
```

#### 2. **Get Public Series**

- **Endpoint:** `GET /public/series`
- **Auth Required:** ❌ No

#### 3. **Get Public Matches**

- **Endpoint:** `GET /public/matches`
- **Auth Required:** ❌ No

#### 4. **Get Public Players**

- **Endpoint:** `GET /public/players`
- **Auth Required:** ❌ No

#### 5. **Get Public Teams**

- **Endpoint:** `GET /public/teams`
- **Auth Required:** ❌ No

---

## 🗄 Database Models

### User Model

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (hashed with bcrypt),
  role: Enum["SUPER_ADMIN", "ADMIN", "SCORER", "USER"],
  picture: String (profile image URL),
  isDeleted: Boolean (soft delete),
  createdAt: Date,
  updatedAt: Date
}
```

### Series Model

```javascript
{
  _id: ObjectId,
  name: String (required),
  startDate: Date,
  endDate: Date,
  format: String (T20, ODI, TEST),
  matches: [ObjectId] (references to Match),
  createdAt: Date,
  updatedAt: Date
}
```

### Match Model

```javascript
{
  _id: ObjectId,
  seriesId: ObjectId (reference to Series),
  team1Id: ObjectId (reference to Team),
  team2Id: ObjectId (reference to Team),
  matchDate: Date,
  venue: String,
  format: String (T20, ODI, TEST),
  status: Enum["UPCOMING", "LIVE", "COMPLETED"],
  toss: {
    winner: ObjectId,
    electedTo: String
  },
  playingXI: {
    team1: [ObjectId],
    team2: [ObjectId]
  },
  result: {
    winner: ObjectId,
    margin: Number,
    marginType: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Team Model

```javascript
{
  _id: ObjectId,
  name: String (required, unique),
  city: String,
  captain: ObjectId (reference to Player),
  logo: String (image URL),
  squad: [ObjectId] (references to Players),
  createdAt: Date,
  updatedAt: Date
}
```

### Player Model

```javascript
{
  _id: ObjectId,
  name: String (required),
  role: String (Batsman, Bowler, All-rounder),
  battingStyle: String,
  bowlingStyle: String,
  jerseyNumber: Number,
  picture: String (image URL),
  stats: {
    matches: Number,
    runs: Number,
    wickets: Number,
    average: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Score Model

```javascript
{
  _id: ObjectId,
  matchId: ObjectId (reference to Match),
  playerId: ObjectId (reference to Player),
  teamId: ObjectId (reference to Team),
  runs: Number,
  balls: Number,
  fours: Number,
  sixes: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Squad Model

```javascript
{
  _id: ObjectId,
  teamId: ObjectId (reference to Team),
  playerId: ObjectId (reference to Player),
  role: String,
  jerseyNumber: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Commentary Model

```javascript
{
  _id: ObjectId,
  matchId: ObjectId (reference to Match),
  commentary: String,
  ballNumber: Number,
  overNumber: Number,
  commentedBy: ObjectId (reference to User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 👤 User Roles & Permissions

| Role            | Permissions                                          |
| --------------- | ---------------------------------------------------- |
| **SUPER_ADMIN** | Full system access, user management, role assignment |
| **ADMIN**       | Tournament, match, team, player management           |
| **SCORER**      | Live scoring, match updates, commentary              |
| **USER**        | View public matches, series, and statistics          |

### Role Access Matrix

| Feature           | SUPER_ADMIN | ADMIN | SCORER | USER |
| ----------------- | ----------- | ----- | ------ | ---- |
| User Management   | ✅          | ✅    | ❌     | ❌   |
| Series/Tournament | ✅          | ✅    | ❌     | 🔍   |
| Team Management   | ✅          | ✅    | ❌     | 🔍   |
| Player Management | ✅          | ✅    | ❌     | 🔍   |
| Match Management  | ✅          | ✅    | ❌     | 🔍   |
| Live Scoring      | ✅          | ✅    | ✅     | ❌   |
| Public View       | ✅          | ✅    | ✅     | ✅   |

✅ = Full access | 🔍 = View only | ❌ = No access

---

## 🛡 Middleware

### 1. **Security Middleware** (`security.middleware.js`)

- Helmet for security headers
- CORS configuration
- HPP (HTTP Parameter Pollution) protection
- Body parser setup
- Cookie parser setup

### 2. **Authentication Middleware** (`auth.middleware.js`)

- JWT token verification
- User extraction from token
- Protected route enforcement

### 3. **Authorization Middleware** (`auth.middleware.js`)

- Role-based access control
- Route permission checking
- User role validation

### 4. **Validation Middleware** (`validate.middleware.js`)

- Request body validation using Joi/Zod
- Query parameter validation
- Type checking

### 5. **Google OAuth Middleware** (`googleOAuth.middleware.js`)

- Passport.js strategy setup
- Google OAuth configuration

### 6. **Error Handler Middleware** (`errorHandler.middleware.js`)

- Global error handling
- Error response formatting
- Logging error details

### 7. **MongoDB ObjectId Validator** (`validateObjectId.middleware.js`)

- Validates MongoDB ObjectId format
- Prevents invalid queries

### 8. **404 Handler** (`notFound.middleware.js`)

- Handles undefined routes
- Returns 404 error response

---

## 📦 Installation & Running

### Prerequisites

```bash
Node.js v18.0.0 or higher
MongoDB 4.0 or higher
npm v8.0.0 or higher
```

### Full Project Setup

#### 1. **Clone/Extract Project**

```bash
cd Cricbuzz-Project
```

#### 2. **Backend Setup**

```bash
cd Server

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/cricbuzz
JWT_SECRET=your_jwt_secret_key_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CORS_ORIGIN=http://localhost:5173
LOG_LEVEL=info
EOF

# Start server
npm run dev
```

#### 3. **Frontend Setup**

```bash
cd ../Client

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
VITE_API_URL=http://localhost:5000/api
EOF

# Start development server
npm run dev
```

#### 4. **Access Application**

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api`

---

## 🌍 Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/cricbuzz
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cricbuzz

# JWT
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
JWT_EXPIRE=7d

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# CORS
CORS_ORIGIN=http://localhost:5173,http://localhost:3000

# Logging
LOG_LEVEL=debug  # debug, info, warn, error

# Email (for future use)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_password
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Cricbuzz
```

---

## 💻 Development Guide

### Project Architecture

#### Backend Architecture: **MVC + Repository Pattern**

- **Models:** MongoDB schemas
- **Controllers:** Request handling and business logic
- **Services:** Business logic layer
- **Repository:** Data access layer
- **Routes:** API endpoints

#### Frontend Architecture: **Component-based with Hooks**

- **Pages:** Full-page components
- **Components:** Reusable UI components
- **Hooks:** Custom React hooks for logic
- **Services:** API integration
- **Redux:** Global state management

### Adding New Features

#### 1. **Adding New API Endpoint (Backend)**

**Step 1:** Create model if needed

```bash
Server/src/modules/newfeature/newfeature.model.js
```

**Step 2:** Create controller

```bash
Server/src/modules/newfeature/newfeature.controller.js
```

**Step 3:** Create service

```bash
Server/src/modules/newfeature/newfeature.service.js
```

**Step 4:** Create repository

```bash
Server/src/modules/newfeature/newfeature.repository.js
```

**Step 5:** Create routes

```bash
Server/src/modules/newfeature/newfeature.route.js
```

**Step 6:** Create validators

```bash
Server/src/modules/newfeature/validators/newfeature.validator.js
```

**Step 7:** Mount route in app.js

```javascript
import newfeatureRouter from "./modules/newfeature/newfeature.route.js";
app.use("/api/newfeature", newfeatureRouter);
```

#### 2. **Adding New Frontend Page**

```bash
Client/src/pages/private/NewPage.jsx
```

Update router in App.jsx:

```javascript
import NewPage from "./pages/private/NewPage";

// Add route in ProtectedRoute
<Route path="/newpage" element={<NewPage />} />;
```

### Debugging Tips

1. **Backend Debugging:**
   - Check logs: `npm run dev`
   - Use Postman for API testing
   - MongoDB Compass for database inspection

2. **Frontend Debugging:**
   - React DevTools browser extension
   - Redux DevTools for state inspection
   - Network tab in browser DevTools

### Testing

```bash
# Backend - Create test files
Server/src/modules/feature/feature.test.js

# Frontend - Create test files
Client/src/components/Component.test.jsx
```

---

## 📋 Future Development

### Planned Features

- [ ] Advanced match statistics
- [ ] Player performance analytics
- [ ] Fantasy cricket integration
- [ ] Live commentary enhancement
- [ ] Video highlights integration
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Admin analytics dashboard
- [ ] Social sharing features
- [ ] Betting integration (where applicable)
- [ ] API documentation with Swagger

### Known Limitations

- Google OAuth requires additional setup
- Real-time updates need Socket.io implementation
- File uploads not configured
- Email notifications pending implementation

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/YourFeature`
2. Commit changes: `git commit -m 'Add YourFeature'`
3. Push to branch: `git push origin feature/YourFeature`
4. Open pull request

---

## 📄 License

This project is licensed under the ISC License - see LICENSE file for details.

---

## 📞 Support

For issues and questions:

- Check existing documentation
- Review error logs
- Check browser console for frontend errors
- Use Postman to test API endpoints

---

## 🎯 Project Status

**Current Version:** 1.0.0 (Development)

### ✅ Completed

- Authentication (JWT + Google OAuth)
- User management
- CRUD operations for all main entities
- MongoDB integration
- Error handling
- Security middleware
- API documentation
- Public API routes
- Role-based access control

### 🔄 In Progress

- Live scoring real-time updates
- Socket.io integration
- Advanced match analytics
- Email notifications

### ⏳ Pending

- Unit testing
- Integration testing
- Production deployment
- API rate limiting refinement
- Cache optimization

---

**Last Updated:** 16/06/2026
**Maintained By:** Tantra-Ansh Team
