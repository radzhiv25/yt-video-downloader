# Project Structure

This document provides a detailed overview of the YouTube Downloader monorepo structure.

## 📁 Root Directory

```
youtube-downloader/
├── 📄 package.json              # Root monorepo configuration
├── 📄 README.md                 # Main project documentation
├── 📄 LICENSE                   # MIT License
├── 📄 .gitignore               # Git ignore patterns
├── 📄 Makefile                 # Development commands
├── 📄 docker-compose.yml       # Multi-service orchestration
├── 📄 PROJECT_STRUCTURE.md     # This file
├── 📁 .github/                 # GitHub Actions CI/CD
│   └── 📁 workflows/
│       └── 📄 ci.yml           # CI/CD pipeline
├── 📁 scripts/                 # Development and deployment scripts
│   ├── 📄 dev.sh              # Development environment setup
│   └── 📄 deploy.sh           # Production deployment
├── 📁 frontend/                # Next.js 15 frontend application
└── 📁 backend/                 # Python FastAPI backend service
```

## 🎨 Frontend (`/frontend`)

```
frontend/
├── 📄 package.json             # Frontend dependencies
├── 📄 next.config.ts           # Next.js configuration
├── 📄 tsconfig.json            # TypeScript configuration
├── 📄 tailwind.config.js       # Tailwind CSS configuration
├── 📄 Dockerfile               # Frontend containerization
├── 📄 .dockerignore            # Docker build exclusions
├── 📁 app/                     # Next.js 15 App Router
│   ├── 📄 layout.tsx           # Root layout
│   ├── 📄 page.tsx             # Home page
│   ├── 📄 globals.css          # Global styles
│   ├── 📁 download/            # Download page
│   ├── 📁 disclaimer/          # Disclaimer page
│   └── 📁 api/                 # API routes
├── 📁 components/              # Reusable UI components
│   ├── 📁 ui/                  # Base UI components
│   ├── 📁 common/              # Common components
│   └── 📄 downloader.tsx       # Main downloader component
├── 📁 lib/                     # Utility libraries
│   ├── 📄 supabaseClient.ts    # Supabase client
│   └── 📄 utils.ts             # Utility functions
└── 📁 public/                  # Static assets
```

## 🔧 Backend (`/backend`)

```
backend/
├── 📄 package.json             # Backend npm workspace
├── 📄 requirements.txt         # Python dependencies
├── 📄 main.py                  # FastAPI application entry point
├── 📄 README.md                # Backend documentation
├── 📄 Dockerfile               # Backend containerization
├── 📄 .dockerignore            # Docker build exclusions
└── 📁 youtube_downloader_lib/  # Core downloader library
    ├── 📄 __init__.py          # Library initialization
    └── 📄 downloader.py        # Core downloader functionality
```

## 🚀 Key Features

### Monorepo Benefits
- **Unified Development**: Single repository for frontend and backend
- **Shared Tooling**: Common linting, testing, and build configurations
- **Dependency Management**: Centralized package management
- **Easy Deployment**: Deploy both services together
- **Code Sharing**: Share types, utilities, and configurations

### Development Workflow
1. **Setup**: `make setup` or `./scripts/dev.sh`
2. **Development**: `make dev` or `./scripts/dev.sh`
3. **Building**: `make build`
4. **Testing**: `make test`
5. **Linting**: `make lint`
6. **Deployment**: `./scripts/deploy.sh`

### Docker Support
- **Development**: `docker-compose up`
- **Production**: `docker-compose -f docker-compose.prod.yml up -d`
- **Health Checks**: Built-in health monitoring
- **Volume Mounting**: Hot-reload for development

## 🔗 Service Communication

```
Frontend (Port 3000) ←→ Backend (Port 8000)
     ↓                           ↓
  Next.js App              FastAPI Service
     ↓                           ↓
  React Components         YouTube Downloader
     ↓                           ↓
  User Interface           yt-dlp Library
```

## 📊 API Endpoints

### Backend API (`http://localhost:8000`)
- `GET /` - API information
- `GET /health` - Health check
- `GET /info?url={youtube_url}` - Video metadata
- `POST /download` - Download video/audio
- `GET /download-file/{filename}` - Download file
- `GET /stats` - Download statistics
- `GET /docs` - Interactive API documentation

### Frontend Routes (`http://localhost:3000`)
- `/` - Home page with features and testimonials
- `/download` - Main download interface
- `/disclaimer` - Legal disclaimer
- `/api/*` - Frontend API routes

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Components**: Radix UI primitives
- **State Management**: React hooks
- **Forms**: React Hook Form + Zod validation

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.8+
- **YouTube Library**: yt-dlp
- **HTTP Server**: Uvicorn
- **Validation**: Pydantic
- **CORS**: Built-in middleware

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **CI/CD**: GitHub Actions
- **Monitoring**: Health checks
- **Security**: CORS, headers, rate limiting

## 📦 Package Management

### Root Level
- **npm workspaces** for Node.js packages
- **concurrently** for running multiple services
- **Makefile** for common development tasks

### Frontend
- **Next.js 15** with latest React features
- **Tailwind CSS 4** for styling
- **TypeScript** for type safety

### Backend
- **Python virtual environment** for isolation
- **pip** for dependency management
- **requirements.txt** for reproducible builds

## 🔒 Security Features

- **CORS Configuration**: Frontend-backend communication
- **Input Validation**: Pydantic models for API requests
- **File Type Validation**: Secure file serving
- **Rate Limiting**: Configurable request limits
- **Security Headers**: X-Frame-Options, X-Content-Type-Options

## 📈 Monitoring & Health

- **Health Endpoints**: `/health` for each service
- **Docker Health Checks**: Container-level monitoring
- **Logging**: Structured logging with different levels
- **Metrics**: Download statistics and usage metrics

## 🚀 Deployment Options

### Local Development
```bash
./scripts/dev.sh
```

### Docker Development
```bash
docker-compose up
```

### Production Deployment
```bash
./scripts/deploy.sh
```

### Cloud Deployment
- **Frontend**: Vercel, Netlify, or any static hosting
- **Backend**: Docker containers on any cloud platform
- **Database**: Supabase (if needed)

## 🔧 Configuration

### Environment Variables
- **Frontend**: Next.js environment variables
- **Backend**: Python environment variables
- **Docker**: Environment-specific configurations

### Build Configuration
- **Frontend**: Next.js standalone output for Docker
- **Backend**: Python requirements and dependencies
- **Docker**: Multi-stage builds for optimization

This structure provides a scalable, maintainable, and developer-friendly monorepo that can easily grow with your project needs.
