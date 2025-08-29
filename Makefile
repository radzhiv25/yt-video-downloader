.PHONY: help install dev build start clean test lint format docker-build docker-run docker-stop

# Default target
help:
	@echo "YouTube Downloader - Monorepo"
	@echo ""
	@echo "Available commands:"
	@echo "  install     - Install all dependencies (Node.js + Python)"
	@echo "  dev         - Start both frontend and backend in development mode"
	@echo "  dev:frontend- Start only frontend development server"
	@echo "  dev:backend - Start only backend development server"
	@echo "  build       - Build all packages"
	@echo "  start       - Start production servers"
	@echo "  test        - Run tests across all packages"
	@echo "  lint        - Run linting across all packages"
	@echo "  format      - Format Python code"
	@echo "  clean       - Clean all build artifacts and dependencies"
	@echo "  docker-build- Build Docker images"
	@echo "  docker-run  - Run services with Docker Compose"
	@echo "  docker-stop - Stop Docker services"
	@echo ""

# Install dependencies
install:
	@echo "Installing all dependencies..."
	npm install
	@echo "Setting up Python virtual environment..."
	cd backend && python -m venv venv
	cd backend && source venv/bin/activate && pip install -r requirements.txt
	@echo "Installation complete!"

# Development
dev:
	@echo "Starting both frontend and backend in development mode..."
	npm run dev

dev:frontend:
	@echo "Starting frontend development server..."
	npm run dev:frontend

dev:backend:
	@echo "Starting backend development server..."
	npm run dev:backend

# Build
build:
	@echo "Building all packages..."
	npm run build

# Start production
start:
	@echo "Starting production servers..."
	npm run start

# Testing
test:
	@echo "Running tests..."
	npm run test

# Linting
lint:
	@echo "Running linting..."
	npm run lint

# Format Python code
format:
	@echo "Formatting Python code..."
	cd backend && source venv/bin/activate && black .

# Clean
clean:
	@echo "Cleaning build artifacts and dependencies..."
	npm run clean
	rm -rf node_modules
	rm -rf frontend/node_modules
	rm -rf backend/venv
	rm -rf backend/__pycache__
	rm -rf frontend/.next
	rm -rf frontend/out

# Docker commands
docker-build:
	@echo "Building Docker images..."
	docker-compose build

docker-run:
	@echo "Starting services with Docker Compose..."
	docker-compose up -d

docker-stop:
	@echo "Stopping Docker services..."
	docker-compose down

# Setup development environment
setup: install
	@echo "Development environment setup complete!"
	@echo "Run 'make dev' to start development servers"

# Show status
status:
	@echo "Checking service status..."
	@echo "Frontend: http://localhost:3000"
	@echo "Backend: http://localhost:8000"
	@echo ""
	@echo "Docker services:"
	docker-compose ps

