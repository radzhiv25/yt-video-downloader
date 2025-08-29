"""
YouTube Downloader Library
A reusable library for downloading YouTube videos and audio
"""

from .downloader import (
    YouTubeDownloader,
    download_video,
    download_audio,
    get_video_info,
    get_available_formats,
)

__version__ = "1.0.0"
__author__ = "Your Name"
__email__ = "your.email@example.com"

__all__ = [
    "YouTubeDownloader",
    "download_video",
    "download_audio", 
    "get_video_info",
    "get_available_formats",
] 