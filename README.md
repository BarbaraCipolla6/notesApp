# Notes App

A simple web application for creating, editing, archiving, and managing notes.

## Requirements

Before running this application, ensure you have the following installed:

- **Node.js**: v20.19.6 or higher
- **npm**: v10.8.2 or higher
- **PostgreSQL**: v16.11 or higher
- **Git**: v2.34.0 or higher
## Tech Stack

### Backend
- Node.js
- TypeScript
- Express.js
- Prisma ORM
- PostgreSQL

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript

## Architecture

The backend follows a layered architecture:
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Repositories**: Handle data access through Prisma ORM

## Installation & Setup

### 1. Clone the repository
```bash
git clone <git@github.com:BarbaraCipolla6/notesApp.git>
cd notesApp
```

### 2. Configure PostgreSQL

Make sure PostgreSQL is running on your system:
```bash
sudo service postgresql start
```

### 3. Configure environment variables

The `start.sh` script will create a `.env` file automatically in the `backend/` folder with default values:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/notes_db"
```

If your PostgreSQL configuration is different, update the `.env` file with your credentials before running the app.

### 4. Run the application

Simply execute the start script:
```bash
./start.sh
```

This script will:
- Install all backend dependencies
- Create the database if it doesn't exist
- Generate Prisma client
- Push the database schema
- Start the backend server on http://localhost:3000
- Open the frontend in your default browser

## Manual Setup (Alternative)

If you prefer to set up manually:

### Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npx ts-node src/server.ts
```

### Frontend
Open `frontend/index.html` in your browser.

## Features (Phase 1)

- Create new notes
- Edit existing notes
- Delete notes
- Archive/Unarchive notes
- View active notes
- View archived notes

## API Endpoints

- `GET /notes` - Get all active notes
- `GET /notes/archived` - Get all archived notes
- `POST /notes` - Create a new note
- `PUT /notes/:id` - Update a note
- `PATCH /notes/:id/archive` - Archive/unarchive a note
- `DELETE /notes/:id` - Delete a note

## Project Structure
```
notes_app/
├── backend/
│   ├── src/
│   │   ├── controllers/      # HTTP request handlers
│   │   ├── services/         # Business logic
│   │   ├── repositories/     # Data access layer
│   │   ├── routes/           # Route definitions
│   │   ├── lib/
│   │   │   └── prisma.ts     # Prisma client instance
│   │   └── server.ts         # Application entry point
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   └── prisma.config.ts  # Prisma configuration
│   ├── .env                  # Environment variables
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   └── index.html            # SPA application
├── start.sh                  # Startup script
└── README.md
```

## Database Schema
```prisma
model Note {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  archived  Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Troubleshooting

### Port already in use
If port 3000 is already in use, you can change it in the `.env` file:
```
PORT=3001
```

### PostgreSQL connection error
Make sure PostgreSQL is running:
```bash
sudo service postgresql status
```

If it's not running:
```bash
sudo service postgresql start
```

### Database doesn't exist
The start script creates the database automatically. If you need to create it manually:
```bash
createdb -U postgres notes_db
```

## Development

To run in development mode with auto-reload:
```bash
cd backend
npm install -D nodemon
npx nodemon --exec ts-node src/server.ts
```

## License

MIT
