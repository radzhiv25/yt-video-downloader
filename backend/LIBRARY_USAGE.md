# YouTube Downloader Library - Usage Guide

## Overview

Yes, absolutely! You can convert your YouTube downloader into a reusable library and use it in other applications to get video blobs. I've created a complete library structure for you.

## What's Been Created

### 1. **Core Library** (`youtube_downloader_lib/`)
- `__init__.py` - Package initialization and exports
- `downloader.py` - Main library functionality

### 2. **Installation Files**
- `setup.py` - Package installation configuration
- `requirements.txt` - Dependencies
- `README.md` - Comprehensive documentation

### 3. **Examples and Tests**
- `example_usage.py` - Basic and advanced usage examples
- `test_library.py` - Library functionality tests
- `get_video_blob.py` - **Specifically shows how to get video blobs**
- `main_with_library.py` - Updated FastAPI app using the library

## How to Use the Library

### Installation

```bash
cd backend
pip install -e .
```

### Basic Usage

```python
from youtube_downloader_lib import download_video, download_audio, get_video_info

# Download video
result = download_video("https://www.youtube.com/watch?v=example")
if result['success']:
    print(f"Downloaded: {result['file_path']}")
    print(f"Title: {result['title']}")
```

### Getting Video Blobs (Your Main Question)

The `get_video_blob.py` file shows exactly how to get video blobs for other applications:

```python
from get_video_blob import get_video_as_blob, get_audio_as_blob

# Get video as base64 blob
result = get_video_as_blob("https://www.youtube.com/watch?v=example")
if result['success']:
    blob_data = result['blob']  # Base64 encoded video data
    filename = result['filename']
    mime_type = result['mime_type']
    
    # Use in web applications
    data_url = f"data:{mime_type};base64,{blob_data}"
```

## Use Cases for Video Blobs

### 1. **Web Applications**
```javascript
// Frontend JavaScript
fetch('/api/download-video?url=...')
  .then(response => response.json())
  .then(data => {
    const video = document.createElement('video');
    video.src = `data:video/mp4;base64,${data.blob}`;
    document.body.appendChild(video);
  });
```

### 2. **API Responses**
```python
# FastAPI endpoint
@app.get("/video-blob")
async def get_video_blob(url: str):
    result = get_video_as_blob(url)
    return {
        "blob": result['blob'],
        "filename": result['filename'],
        "mime_type": result['mime_type']
    }
```

### 3. **Database Storage**
```python
# Store blob in database
result = get_video_as_blob(url)
if result['success']:
    db.store_video_blob(
        title=result['title'],
        blob_data=result['blob'],
        mime_type=result['mime_type']
    )
```

### 4. **Cross-Platform Applications**
```python
# Desktop app, mobile app, etc.
result = get_video_as_blob(url)
if result['success']:
    # Save to local storage
    save_blob_to_file(result['blob'], result['filename'])
```

## Library Features

### Core Functions
- `download_video()` - Download videos in various formats
- `download_audio()` - Download audio-only content
- `get_video_info()` - Get metadata without downloading
- `get_available_formats()` - List available formats

### Advanced Features
- Custom output paths
- Format selection (1080p, 720p, etc.)
- Audio quality control
- Temporary file management
- Comprehensive error handling

### Blob Functions
- `get_video_as_blob()` - Get video as base64 blob
- `get_audio_as_blob()` - Get audio as base64 blob
- `save_blob_to_file()` - Save blob to file

## Integration Examples

### 1. **Flask Application**
```python
from flask import Flask, jsonify, request
from get_video_blob import get_video_as_blob

app = Flask(__name__)

@app.route('/download', methods=['POST'])
def download():
    url = request.json['url']
    result = get_video_as_blob(url)
    return jsonify(result)
```

### 2. **Django Application**
```python
from django.http import JsonResponse
from get_video_blob import get_video_as_blob

def download_view(request):
    url = request.GET.get('url')
    result = get_video_as_blob(url)
    return JsonResponse(result)
```

### 3. **Node.js Integration**
```python
# Python script called from Node.js
import sys
import json
from get_video_blob import get_video_as_blob

url = sys.argv[1]
result = get_video_as_blob(url)
print(json.dumps(result))
```

### 4. **Mobile App Backend**
```python
# API for mobile app
@app.post("/mobile/download")
async def mobile_download(request: DownloadRequest):
    result = get_video_as_blob(request.url)
    return {
        "success": result['success'],
        "data": {
            "blob": result['blob'],
            "filename": result['filename'],
            "title": result['title']
        }
    }
```

## Testing the Library

```bash
# Test basic functionality
python test_library.py

# Test with actual downloads
python example_usage.py

# Test blob functionality
python get_video_blob.py
```

## Benefits of This Approach

1. **Reusable** - Use in any Python application
2. **Clean API** - Simple, consistent interface
3. **Flexible** - Multiple output formats and options
4. **Blob Support** - Perfect for web and cross-platform apps
5. **Error Handling** - Comprehensive error management
6. **Documentation** - Complete examples and documentation

## Next Steps

1. **Install the library**: `pip install -e .`
2. **Test functionality**: Run the test scripts
3. **Integrate into your app**: Use the blob functions
4. **Customize as needed**: Modify formats, quality, etc.

The library is now ready to use in any application where you need to download YouTube videos and get them as blobs! 