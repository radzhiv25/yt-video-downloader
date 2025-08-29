# YouTube Downloader - Monorepo

A modern, fast, and secure YouTube video downloader built as a monorepo with a Python backend and Next.js frontend.

## 🏗️ Project Structure

```
youtube-downloader/
├── frontend/                 # Next.js 15 + TypeScript frontend
│   ├── app/                 # App Router components
│   ├── components/          # Reusable UI components
│   └── package.json         # Frontend dependencies
├── backend/                 # Python backend with yt-dlp
│   ├── youtube_downloader_lib/  # Core downloader library
│   ├── requirements.txt     # Python dependencies
│   └── main.py             # Backend server
├── package.json             # Root monorepo configuration
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm 8+
- **Python** 3.8+
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/youtube-downloader.git
   cd youtube-downloader
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

   This will:
   - Install Node.js dependencies for both frontend and backend
   - Create a Python virtual environment
   - Install Python dependencies

### Development

**Start both frontend and backend in development mode:**
```bash
npm run dev
```

**Start only frontend:**
```bash
npm run dev:frontend
```

**Start only backend:**
```bash
npm run dev:backend
```

### Production

**Build all packages:**
```bash
npm run build
```

**Start production servers:**
```bash
npm run start
```

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start both frontend and backend in development mode |
| `npm run dev:frontend` | Start only frontend development server |
| `npm run dev:backend` | Start only backend development server |
| `npm run build` | Build all packages |
| `npm run start` | Start production servers |
| `npm run lint` | Run linting across all packages |
| `npm run test` | Run tests across all packages |
| `npm run clean` | Clean all build artifacts and node_modules |
| `npm run install:all` | Install all dependencies (Node.js + Python) |

## 🔧 Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **Supabase** - Backend-as-a-Service

### Backend
- **Python 3.8+** - Core language
- **yt-dlp** - YouTube video downloader library
- **FastAPI** - Modern Python web framework
- **Virtual Environment** - Isolated Python dependencies

## 🌟 Features

- **Ultra HD Downloads** - Support for up to 4K resolution
- **Audio Extraction** - High-quality MP3 conversion
- **Privacy First** - All processing happens locally
- **Lightning Fast** - Optimized download speeds
- **No Limits** - Unlimited downloads, forever free
- **Modern UI** - Beautiful, responsive design
- **Type Safety** - Full TypeScript support

## 📁 Monorepo Benefits

- **Unified Development** - Single repository for frontend and backend
- **Shared Tooling** - Common linting, testing, and build configurations
- **Dependency Management** - Centralized package management
- **Easy Deployment** - Deploy both services together
- **Code Sharing** - Share types, utilities, and configurations

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the .next folder
```

### Backend (Docker/Heroku)
```bash
cd backend
# Use the provided Dockerfile or requirements.txt
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This tool is for educational and personal use only. Please respect YouTube's Terms of Service and only download content you have permission to download.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/yourusername/youtube-downloader/issues) page
2. Create a new issue with detailed information
3. Include your operating system and error messages

---

Built with ❤️ using modern web technologies

