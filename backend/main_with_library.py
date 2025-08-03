# backend/main_with_library.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from starlette.background import BackgroundTask
from pydantic import BaseModel
import os
from supabase import create_client, Client
from youtube_downloader_lib import YouTubeDownloader

app = FastAPI()

# Allow requests from the frontend (React/Next.js) running on localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the expected request body (a JSON with a 'url' and optional 'type' field)
class DownloadRequest(BaseModel):
    url: str
    type: str = 'video'  # default to video if not provided

# Initialize the YouTube downloader
downloader = YouTubeDownloader()

# Function to delete the downloaded file after sending it to the user
# This keeps your /tmp folder clean
def cleanup_file(path):
    try:
        downloader.cleanup_temp_files(path)
    except Exception:
        pass

SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://pypkhwzachxkyzubbrjr.supabase.co")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5cGtod3phY2h4a3l6dWJicmpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNjQ0MzEsImV4cCI6MjA2Nzc0MDQzMX0.xsgswCYsNa1-9ztc6Zv8WsR6QYyW3t6PzaN9-QO5EVg")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.post("/download")
async def download_video(request: DownloadRequest):
    if request.type == 'audio':
        # Download audio using the library
        result = downloader.download_audio(
            url=request.url,
            codec='mp3',
            quality='192'
        )
    else:
        # Download video using the library
        result = downloader.download_video(
            url=request.url,
            format='137+251',
            merge_format='mp4'
        )
    
    if not result['success']:
        raise HTTPException(status_code=400, detail=result['error'])
    
    # Return the file using FastAPI's FileResponse
    file_path = result['file_path']
    filename = result['title'] + ('.mp3' if request.type == 'audio' else '.mp4')
    media_type = 'audio/mpeg' if request.type == 'audio' else 'video/mp4'
    
    return FileResponse(
        file_path,
        media_type=media_type,
        filename=filename,
        background=BackgroundTask(cleanup_file, file_path)
    )

@app.post("/increment-download")
async def increment_download():
    stats = supabase.table("stats").select("id,downloads_today").execute()
    if stats.data and len(stats.data) > 0:
        row = stats.data[0]
        supabase.table("stats").update({"downloads_today": row["downloads_today"] + 1}).eq("id", row["id"]).execute()
    else:
        # If no row exists, create one with downloads_today = 1
        supabase.table("stats").insert({"downloads_today": 1}).execute()
    return {"status": "ok"}

@app.get("/video-info")
async def get_video_info(url: str):
    """Get video information without downloading"""
    result = downloader.get_video_info(url)
    if not result['success']:
        raise HTTPException(status_code=400, detail=result['error'])
    
    # Return only essential info for the frontend
    return {
        "title": result['title'],
        "duration": result['duration'],
        "uploader": result['uploader'],
        "thumbnail": result['thumbnail'],
        "view_count": result['view_count'],
        "like_count": result['like_count']
    }

@app.get("/available-formats")
async def get_available_formats(url: str):
    """Get available formats for a video"""
    result = downloader.get_available_formats(url)
    if not result['success']:
        raise HTTPException(status_code=400, detail=result['error'])
    
    return {
        "video_formats": result['video_formats'][:10],  # Limit to first 10
        "audio_formats": result['audio_formats'][:10],  # Limit to first 10
        "title": result['title'],
        "duration": result['duration']
    } 