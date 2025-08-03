# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from starlette.background import BackgroundTask
from pydantic import BaseModel
import yt_dlp
import os
import uuid
from supabase import create_client, Client

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

# Function to delete the downloaded file after sending it to the user
# This keeps your /tmp folder clean
def cleanup_file(path):
    try:
        os.remove(path)
    except Exception:
        pass

SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://pypkhwzachxkyzubbrjr.supabase.co")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5cGtod3phY2h4a3l6dWJicmpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNjQ0MzEsImV4cCI6MjA2Nzc0MDQzMX0.xsgswCYsNa1-9ztc6Zv8WsR6QYyW3t6PzaN9-QO5EVg")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.post("/download")
async def download_video(request: DownloadRequest):
    # Generate a unique filename for this download (prevents file conflicts)
    temp_id = str(uuid.uuid4())
    output_base = f"/tmp/{temp_id}"

    if request.type == 'audio':
        ydl_opts = {
            'format': 'bestaudio/best',
            'outtmpl': output_base + ".%(ext)s",
            'quiet': True,
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
        }
    else:
        ydl_opts = {
            'format': '137+251',
            'outtmpl': output_base + ".%(ext)s",
            'merge_output_format': 'mp4',
            'quiet': True,
        }
    try:
        # Download and merge the video+audio using yt-dlp
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(request.url, download=True)
            if request.type == 'audio':
                # Look for the mp3 file
                audio_file = output_base + '.mp3'
                if not os.path.exists(audio_file):
                    raise HTTPException(status_code=500, detail="Download failed: audio file not found.")
                return FileResponse(
                    audio_file,
                    media_type='audio/mpeg',
                    filename=info.get('title', 'audio') + '.mp3',
                    background=BackgroundTask(cleanup_file, audio_file)
                )
            else:
                # Try to get the actual output filename from yt-dlp info
                merged_file = info.get('_filename')
                # Fallback: check for common extensions if the file does not exist
                if not merged_file or not os.path.exists(merged_file):
                    for ext in ['.mp4', '.mkv', '.webm']:
                        candidate = output_base + ext
                        if os.path.exists(candidate):
                            merged_file = candidate
                            break
                if not merged_file or not os.path.exists(merged_file):
                    raise HTTPException(status_code=500, detail="Download failed: merged video file not found.")
                return FileResponse(
                    merged_file,
                    media_type='video/mp4',  # Tell the browser this is a video file
                    filename=info.get('title', 'video') + '.mp4',  # Suggest a filename for the user
                    background=BackgroundTask(cleanup_file, merged_file)  # Clean up after sending
                )
    except yt_dlp.utils.DownloadError as e:
        # If yt-dlp fails (e.g., invalid URL), return an error to the frontend
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # Catch-all for any other errors
        raise HTTPException(status_code=400, detail=f"Invalid request: {str(e)}")

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