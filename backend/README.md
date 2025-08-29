# YouTube Downloader Backend

A FastAPI-based backend service for downloading YouTube videos and audio files.

## Features

- **Video Downloads**: Download YouTube videos in various qualities (720p, 1080p, 4K)
- **Audio Extraction**: Extract high-quality MP3 audio from videos
- **RESTful API**: Clean, documented API endpoints
- **CORS Support**: Frontend integration ready
- **Health Checks**: Docker and monitoring compatible
- **File Management**: Automatic file cleanup and organization

## API Endpoints

### Health Check
- `GET /health` - Service health status

### Video Information
- `GET /info?url={youtube_url}` - Get video metadata

### Downloads
- `POST /download` - Download video or audio
- `GET /download-file/{filename}` - Download completed file

### Statistics
- `GET /stats` - Get download statistics

## Request Format

```json
{
  "url": "https://www.youtube.com/watch?v=VIDEO_ID",
  "format": "mp4",  // "mp4" or "mp3"
  "quality": "best" // "best", "720p", "1080p", etc.
}
```

## Response Format

```json
{
  "success": true,
  "message": "Download completed successfully",
  "download_url": "/download-file/filename.mp4",
  "filename": "filename.mp4"
}
```

## Development

### Prerequisites
- Python 3.8+
- pip

### Installation
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Running the Service
```bash
# Development mode
python main.py

# Or using uvicorn directly
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Docker
```bash
# Build image
docker build -t youtube-downloader-backend .

# Run container
docker run -p 8000:8000 youtube-downloader-backend
```

## Configuration

The service automatically creates a `downloads` directory for storing downloaded files. You can customize this by modifying the `YouTubeDownloader` class.

## Error Handling

The API returns appropriate HTTP status codes and error messages for various failure scenarios:

- `400 Bad Request`: Invalid URL or request format
- `404 Not Found`: File not found
- `500 Internal Server Error`: Download or processing failures

## Security Notes

- CORS is configured for development (localhost:3000)
- Update `allow_origins` in production
- Downloaded files are served with proper content types
- Consider implementing rate limiting for production use

## Integration with Frontend

This backend is designed to work seamlessly with the Next.js frontend in this monorepo. The frontend can:

1. Send download requests to `/download`
2. Display video information from `/info`
3. Show statistics from `/stats`
4. Handle file downloads from `/download-file/{filename}`

## License

MIT License - see the main repository LICENSE file. 