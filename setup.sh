#!/bin/bash

# VitalApp Setup Script
# This script helps set up the development environment for VitalApp

echo "🚀 VitalApp Setup Script"
echo "========================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL not found in PATH."
    echo "Please ensure PostgreSQL is installed and running."
    echo "Visit: https://www.postgresql.org/"
fi

echo ""
echo "📦 Installing Backend Dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
echo "✅ Backend dependencies installed"

echo ""
echo "📦 Installing Frontend Dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
echo "✅ Frontend dependencies installed"

cd ..

# Create .env files if they don't exist
echo ""
echo "⚙️  Setting up environment files..."

if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env from example"
    echo "⚠️  Please edit backend/.env with your PostgreSQL credentials"
else
    echo "ℹ️  backend/.env already exists"
fi

if [ ! -f frontend/.env ]; then
    cp frontend/.env.example frontend/.env
    echo "✅ Created frontend/.env from example"
else
    echo "ℹ️  frontend/.env already exists"
fi

echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Make sure PostgreSQL is running"
echo "2. Create a database named 'vitalapp' (or edit backend/.env)"
echo "   Command: psql -U postgres -c 'CREATE DATABASE vitalapp;'"
echo "3. Edit backend/.env with your PostgreSQL credentials if needed"
echo "4. Start the backend: cd backend && npm run dev"
echo "5. Start the frontend (in a new terminal): cd frontend && npm start"
echo ""
echo "🌐 The application will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
