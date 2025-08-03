# YouTube Downloader Library

A reusable Python library for downloading YouTube videos and audio. This library provides a clean, easy-to-use interface for downloading YouTube content programmatically.

## Features

- Download YouTube videos in various formats and qualities
- Download audio-only content (MP3, etc.)
- Get video metadata without downloading
- List available formats for any video
- Clean, object-oriented API
- Comprehensive error handling
- Temporary file management

## Installation

### From Source
```bash
git clone <your-repo-url>
cd youtube-downloader/backend
pip install -e .
```

### Dependencies
The library requires:
- `yt-dlp` - For YouTube downloading
- `ffmpeg` - For audio conversion (must be installed on your system)

## Quick Start

### Basic Usage

```python
from youtube_downloader_lib import download_video, download_audio, get_video_info

# Download a video
result = download_video("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
if result['success']:
    print(f"Downloaded: {result['file_path']}")
    print(f"Title: {result['title']}")
else:
    print(f"Error: {result['error']}")

# Download audio only
result = download_audio("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
if result['success']:
    print(f"Downloaded audio: {result['file_path']}")

# Get video info without downloading
info = get_video_info("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
if info['success']:
    print(f"Title: {info['title']}")
    print(f"Duration: {info['duration']} seconds")
```

### Advanced Usage with Class

```python
from youtube_downloader_lib import YouTubeDownloader

# Create downloader instance
downloader = YouTubeDownloader(temp_dir="/path/to/temp")

# Download video with custom options
result = downloader.download_video(
    url="https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    output_path="/path/to/save/video.mp4",
    format="137+251",  # 1080p video + audio
    merge_format="mp4"
)

# Download audio with custom quality
result = downloader.download_audio(
    url="https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    output_path="/path/to/save/audio.mp3",
    codec="mp3",
    quality="320"
)

# Get available formats
formats = downloader.get_available_formats("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
if formats['success']:
    print("Video formats:")
    for fmt in formats['video_formats']:
        print(f"  {fmt['format_id']}: {fmt['height']}p {fmt['ext']}")
    
    print("Audio formats:")
    for fmt in formats['audio_formats']:
        print(f"  {fmt['format_id']}: {fmt['abr']}kbps {fmt['ext']}")

# Clean up temporary files
downloader.cleanup_temp_files("/path/to/file.mp4")
```

## API Reference

### YouTubeDownloader Class

#### Constructor
```python
YouTubeDownloader(temp_dir: Optional[str] = None)
```
- `temp_dir`: Directory for temporary files (defaults to system temp directory)

#### Methods

##### download_video()
```python
download_video(
    url: str,
    output_path: Optional[str] = None,
    format: str = '137+251',
    merge_format: str = 'mp4'
) -> Dict[str, Any]
```

Downloads a YouTube video.

**Parameters:**
- `url`: YouTube video URL
- `output_path`: Path to save the video (optional)
- `format`: Video format (default: '137+251' for 1080p video + audio)
- `merge_format`: Output format (default: 'mp4')

**Returns:**
Dictionary with keys:
- `success`: Boolean indicating success
- `file_path`: Path to downloaded file
- `title`: Video title
- `duration`: Video duration in seconds
- `uploader`: Channel name
- `view_count`: View count
- `like_count`: Like count
- `description`: Video description
- `thumbnail`: Thumbnail URL
- `webpage_url`: Original video URL
- `extractor`: Extractor name
- `ext`: File extension
- `error`: Error message (if failed)

##### download_audio()
```python
download_audio(
    url: str,
    output_path: Optional[str] = None,
    format: str = 'bestaudio/best',
    codec: str = 'mp3',
    quality: str = '192'
) -> Dict[str, Any]
```

Downloads audio from a YouTube video.

**Parameters:**
- `url`: YouTube video URL
- `output_path`: Path to save the audio (optional)
- `format`: Audio format (default: 'bestaudio/best')
- `codec`: Audio codec (default: 'mp3')
- `quality`: Audio quality (default: '192')

**Returns:**
Same structure as `download_video()` but for audio files.

##### get_video_info()
```python
get_video_info(url: str) -> Dict[str, Any]
```

Gets video metadata without downloading.

**Returns:**
Dictionary with video information including formats, upload date, tags, etc.

##### get_available_formats()
```python
get_available_formats(url: str) -> Dict[str, Any]
```

Gets all available formats for a video.

**Returns:**
Dictionary with `video_formats` and `audio_formats` lists.

##### cleanup_temp_files()
```python
cleanup_temp_files(file_path: str) -> bool
```

Deletes a temporary file.

### Convenience Functions

The library also provides standalone functions for quick usage:

- `download_video(url, output_path=None, **kwargs)`
- `download_audio(url, output_path=None, **kwargs)`
- `get_video_info(url)`
- `get_available_formats(url)`

## Format Options

### Video Formats
- `137+251`: 1080p video + audio (default)
- `136+251`: 720p video + audio
- `135+251`: 480p video + audio
- `134+251`: 360p video + audio
- `133+251`: 240p video + audio
- `160+251`: 144p video + audio
- `best`: Best quality available

### Audio Formats
- `bestaudio/best`: Best audio quality
- `worstaudio/worst`: Worst audio quality
- `bestaudio[ext=m4a]`: Best M4A audio
- `bestaudio[ext=mp3]`: Best MP3 audio

## Error Handling

All methods return a dictionary with a `success` boolean. If `success` is `False`, the `error` field contains the error message.

Common errors:
- Invalid YouTube URL
- Video is private or unavailable
- Network connectivity issues
- Insufficient disk space
- FFmpeg not installed (for audio conversion)

## Examples

### Download and Process Video
```python
from youtube_downloader_lib import YouTubeDownloader
import os

downloader = YouTubeDownloader()

# Download video
result = downloader.download_video("https://www.youtube.com/watch?v=example")
if result['success']:
    # Process the video file
    file_path = result['file_path']
    file_size = os.path.getsize(file_path)
    print(f"Downloaded {result['title']} ({file_size} bytes)")
    
    # Clean up when done
    downloader.cleanup_temp_files(file_path)
else:
    print(f"Download failed: {result['error']}")
```

### Batch Download
```python
from youtube_downloader_lib import download_video

urls = [
    "https://www.youtube.com/watch?v=video1",
    "https://www.youtube.com/watch?v=video2",
    "https://www.youtube.com/watch?v=video3"
]

for i, url in enumerate(urls):
    result = download_video(url, output_path=f"video_{i+1}.mp4")
    if result['success']:
        print(f"Downloaded: {result['title']}")
    else:
        print(f"Failed to download {url}: {result['error']}")
```

### Get Video Information
```python
from youtube_downloader_lib import get_video_info, get_available_formats

url = "https://www.youtube.com/watch?v=example"

# Get basic info
info = get_video_info(url)
if info['success']:
    print(f"Title: {info['title']}")
    print(f"Duration: {info['duration']} seconds")
    print(f"Uploader: {info['uploader']}")
    print(f"Views: {info['view_count']}")

# Get available formats
formats = get_available_formats(url)
if formats['success']:
    print("Available video formats:")
    for fmt in formats['video_formats'][:5]:  # Show first 5
        print(f"  {fmt['format_id']}: {fmt['height']}p {fmt['ext']}")
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Disclaimer

This library is for educational and personal use only. Please respect YouTube's Terms of Service and copyright laws. The authors are not responsible for any misuse of this library. 