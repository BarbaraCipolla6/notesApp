#!/bin/bash

echo "Starting Notes App..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo -e "${RED}PostgreSQL is not installed. Please install PostgreSQL first.${NC}"
    exit 1
fi

echo -e "${BLUE}Installing backend dependencies...${NC}"
cd backend
npm install

echo ""
echo -e "${BLUE}Setting up database...${NC}"

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}.env file not found in backend folder${NC}"
    echo "Creating .env file..."
    echo 'DATABASE_URL="postgresql://postgres:password@localhost:5432/notes_db"' > .env
    echo -e "${GREEN}.env file created. Please update with your PostgreSQL credentials if needed.${NC}"
fi

# Create database if it doesn't exist
DB_EXISTS=$(psql -U postgres -lqt | cut -d \| -f 1 | grep -qw notes_db; echo $?)
if [ $DB_EXISTS -ne 0 ]; then
    echo "Creating database notes_db..."
    createdb -U postgres notes_db
    echo -e "${GREEN}Database created${NC}"
else
    echo -e "${GREEN}Database already exists${NC}"
fi

# Generate Prisma client and push schema
echo -e "${BLUE}Generating Prisma client...${NC}"
npx prisma generate

echo -e "${BLUE}Pushing database schema...${NC}"
npx prisma db push

echo ""
echo -e "${GREEN}Setup complete!${NC}"
echo ""
echo -e "${BLUE}Starting backend server on http://localhost:3000${NC}"
echo -e "${BLUE}Opening frontend in browser...${NC}"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start backend server
npx ts-node src/server.ts &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Open frontend in browser
cd ../frontend
xdg-open index.html 2>/dev/null || open index.html 2>/dev/null || firefox index.html 2>/dev/null

# Wait for backend process
wait $BACKEND_PID
