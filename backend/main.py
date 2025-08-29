#!/usr/bin/env python3
"""
YouTube Downloader Backend Service
A FastAPI-based web service for downloading YouTube videos
"""

import os
import asyncio
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
from typing import Optional, List
import uvicorn
from youtube_downloader_lib.downloader import YouTubeDownloader

# Initialize FastAPI app
app = FastAPI(
    title="YouTube Downloader API",
    description="A fast and secure YouTube video downloader API",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://yourdomain.com"],  # Update with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize downloader
downloader = YouTubeDownloader()

# Request models
class DownloadRequest(BaseModel):
    url: str
    format: str = "mp4"  # mp4, mp3
    quality: str = "best"  # best, 720p, 1080p, etc.

class DownloadResponse(BaseModel):
    success: bool
    message: str
    download_url: Optional[str] = None
    filename: Optional[str] = None
    error: Optional[str] = None

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint for Docker and monitoring"""
    return {"status": "healthy", "service": "youtube-downloader"}

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "YouTube Downloader API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "download": "/download",
            "info": "/info"
        }
    }

@app.get("/info")
async def get_video_info(url: str):
    """Get information about a YouTube video"""
    try:
        info = downloader.get_video_info(url)
        return {
            "success": True,
            "info": info
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/download", response_model=DownloadResponse)
async def download_video(request: DownloadRequest, background_tasks: BackgroundTasks):
    """Download a YouTube video"""
    try:
        # Validate URL
        if not request.url or "youtube.com" not in request.url and "youtu.be" not in request.url:
            raise HTTPException(status_code=400, detail="Invalid YouTube URL")
        
        # Get video info first
        video_info = downloader.get_video_info(request.url)
        
        # Download the video
        if request.format == "mp3":
            filename = downloader.download_audio(request.url, quality=request.quality)
        else:
            filename = downloader.download_video(request.url, quality=request.quality)
        
        # Create download URL
        download_url = f"/download-file/{filename}"
        
        return DownloadResponse(
            success=True,
            message="Download completed successfully",
            download_url=download_url,
            filename=filename
        )
        
    except Exception as e:
        return DownloadResponse(
            success=False,
            message="Download failed",
            error=str(e)
        )

@app.get("/download-file/{filename}")
async def download_file(filename: str):
    """Download a file by filename"""
    file_path = os.path.join(downloader.download_dir, filename)
    
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    return FileResponse(
        path=file_path,
        filename=filename,
        media_type='application/octet-stream'
    )

@app.get("/stats")
async def get_stats():
    """Get download statistics"""
    try:
        downloads_today = len([f for f in os.listdir(downloader.download_dir) 
                             if f.endswith(('.mp4', '.mp3'))])
        
        return {
            "downloads_today": downloads_today,
            "happy_users": 1000,  # Placeholder
            "system_uptime": "99.9%",  # Placeholder
            "user_rating": 4.8  # Placeholder
        }
    except Exception as e:
        return {
            "downloads_today": 0,
            "happy_users": 0,
            "system_uptime": "0%",
            "user_rating": 0
        }

if __name__ == "__main__":
    # Create download directory if it doesn't exist
    os.makedirs(downloader.download_dir, exist_ok=True)
    
    # Run the server
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )