"""
YouTube Downloader Library
A reusable library for downloading YouTube videos and audio
"""

import yt_dlp
import os
import uuid
from typing import Optional, Dict, Any, Union
from pathlib import Path
import tempfile
import shutil


class YouTubeDownloader:
    """
    A library class for downloading YouTube videos and audio
    """
    
    def __init__(self, temp_dir: Optional[str] = None):
        """
        Initialize the YouTube downloader
        
        Args:
            temp_dir: Directory to store temporary files. If None, uses system temp directory
        """
        self.temp_dir = temp_dir or tempfile.gettempdir()
        Path(self.temp_dir).mkdir(parents=True, exist_ok=True)
    
    def download_video(
        self, 
        url: str, 
        output_path: Optional[str] = None,
        format: str = '137+251',
        merge_format: str = 'mp4'
    ) -> Dict[str, Any]:
        """
        Download a YouTube video
        
        Args:
            url: YouTube video URL
            output_path: Path to save the video. If None, saves to temp directory
            format: Video format (default: '137+251' for 1080p video + audio)
            merge_format: Output format (default: 'mp4')
            
        Returns:
            Dict containing:
                - success: bool
                - file_path: str (path to downloaded file)
                - title: str (video title)
                - duration: int (video duration in seconds)
                - error: str (error message if failed)
        """
        temp_id = str(uuid.uuid4())
        output_base = os.path.join(self.temp_dir, temp_id)
        
        if output_path:
            final_output = output_path
        else:
            final_output = output_base + f".{merge_format}"
        
        ydl_opts = {
            'format': format,
            'outtmpl': output_base + ".%(ext)s",
            'merge_output_format': merge_format,
            'quiet': True,
        }
        
        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)
                
                # Find the downloaded file
                merged_file = info.get('_filename')
                if not merged_file or not os.path.exists(merged_file):
                    for ext in [f'.{merge_format}', '.mkv', '.webm']:
                        candidate = output_base + ext
                        if os.path.exists(candidate):
                            merged_file = candidate
                            break
                
                if not merged_file or not os.path.exists(merged_file):
                    return {
                        'success': False,
                        'error': 'Download failed: merged video file not found.'
                    }
                
                # Move to final location if different
                if merged_file != final_output:
                    shutil.move(merged_file, final_output)
                
                return {
                    'success': True,
                    'file_path': final_output,
                    'title': info.get('title', 'video'),
                    'duration': info.get('duration', 0),
                    'uploader': info.get('uploader', ''),
                    'view_count': info.get('view_count', 0),
                    'like_count': info.get('like_count', 0),
                    'description': info.get('description', ''),
                    'thumbnail': info.get('thumbnail', ''),
                    'webpage_url': info.get('webpage_url', ''),
                    'extractor': info.get('extractor', ''),
                    'ext': merge_format
                }
                
        except yt_dlp.utils.DownloadError as e:
            return {
                'success': False,
                'error': str(e)
            }
        except Exception as e:
            return {
                'success': False,
                'error': f"Unexpected error: {str(e)}"
            }
    
    def download_audio(
        self, 
        url: str, 
        output_path: Optional[str] = None,
        format: str = 'bestaudio/best',
        codec: str = 'mp3',
        quality: str = '192'
    ) -> Dict[str, Any]:
        """
        Download audio from a YouTube video
        
        Args:
            url: YouTube video URL
            output_path: Path to save the audio. If None, saves to temp directory
            format: Audio format (default: 'bestaudio/best')
            codec: Audio codec (default: 'mp3')
            quality: Audio quality (default: '192')
            
        Returns:
            Dict containing:
                - success: bool
                - file_path: str (path to downloaded file)
                - title: str (video title)
                - duration: int (video duration in seconds)
                - error: str (error message if failed)
        """
        temp_id = str(uuid.uuid4())
        output_base = os.path.join(self.temp_dir, temp_id)
        
        if output_path:
            final_output = output_path
        else:
            final_output = output_base + f".{codec}"
        
        ydl_opts = {
            'format': format,
            'outtmpl': output_base + ".%(ext)s",
            'quiet': True,
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': codec,
                'preferredquality': quality,
            }],
        }
        
        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)
                
                # Look for the audio file
                audio_file = output_base + f'.{codec}'
                if not os.path.exists(audio_file):
                    return {
                        'success': False,
                        'error': 'Download failed: audio file not found.'
                    }
                
                # Move to final location if different
                if audio_file != final_output:
                    shutil.move(audio_file, final_output)
                
                return {
                    'success': True,
                    'file_path': final_output,
                    'title': info.get('title', 'audio'),
                    'duration': info.get('duration', 0),
                    'uploader': info.get('uploader', ''),
                    'view_count': info.get('view_count', 0),
                    'like_count': info.get('like_count', 0),
                    'description': info.get('description', ''),
                    'thumbnail': info.get('thumbnail', ''),
                    'webpage_url': info.get('webpage_url', ''),
                    'extractor': info.get('extractor', ''),
                    'ext': codec
                }
                
        except yt_dlp.utils.DownloadError as e:
            return {
                'success': False,
                'error': str(e)
            }
        except Exception as e:
            return {
                'success': False,
                'error': f"Unexpected error: {str(e)}"
            }
    
    def get_video_info(self, url: str) -> Dict[str, Any]:
        """
        Get video information without downloading
        
        Args:
            url: YouTube video URL
            
        Returns:
            Dict containing video metadata
        """
        ydl_opts = {
            'quiet': True,
        }
        
        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=False)
                return {
                    'success': True,
                    'title': info.get('title', ''),
                    'duration': info.get('duration', 0),
                    'uploader': info.get('uploader', ''),
                    'view_count': info.get('view_count', 0),
                    'like_count': info.get('like_count', 0),
                    'description': info.get('description', ''),
                    'thumbnail': info.get('thumbnail', ''),
                    'webpage_url': info.get('webpage_url', ''),
                    'extractor': info.get('extractor', ''),
                    'formats': info.get('formats', []),
                    'upload_date': info.get('upload_date', ''),
                    'tags': info.get('tags', []),
                    'categories': info.get('categories', []),
                    'age_limit': info.get('age_limit', 0),
                    'is_live': info.get('is_live', False),
                    'was_live': info.get('was_live', False),
                    'live_status': info.get('live_status', ''),
                    'availability': info.get('availability', ''),
                    'automatic_captions': info.get('automatic_captions', {}),
                    'subtitles': info.get('subtitles', {}),
                    'chapters': info.get('chapters', []),
                    'heatmap': info.get('heatmap', {}),
                }
                
        except yt_dlp.utils.DownloadError as e:
            return {
                'success': False,
                'error': str(e)
            }
        except Exception as e:
            return {
                'success': False,
                'error': f"Unexpected error: {str(e)}"
            }
    
    def get_available_formats(self, url: str) -> Dict[str, Any]:
        """
        Get all available formats for a video
        
        Args:
            url: YouTube video URL
            
        Returns:
            Dict containing available formats
        """
        ydl_opts = {
            'quiet': True,
        }
        
        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=False)
                formats = info.get('formats', [])
                
                # Organize formats by type
                video_formats = []
                audio_formats = []
                
                for fmt in formats:
                    format_info = {
                        'format_id': fmt.get('format_id', ''),
                        'ext': fmt.get('ext', ''),
                        'filesize': fmt.get('filesize', 0),
                        'format_note': fmt.get('format_note', ''),
                        'height': fmt.get('height', 0),
                        'width': fmt.get('width', 0),
                        'fps': fmt.get('fps', 0),
                        'vcodec': fmt.get('vcodec', ''),
                        'acodec': fmt.get('acodec', ''),
                        'abr': fmt.get('abr', 0),
                        'asr': fmt.get('asr', 0),
                    }
                    
                    if fmt.get('vcodec') != 'none':
                        video_formats.append(format_info)
                    elif fmt.get('acodec') != 'none':
                        audio_formats.append(format_info)
                
                return {
                    'success': True,
                    'video_formats': video_formats,
                    'audio_formats': audio_formats,
                    'title': info.get('title', ''),
                    'duration': info.get('duration', 0),
                }
                
        except yt_dlp.utils.DownloadError as e:
            return {
                'success': False,
                'error': str(e)
            }
        except Exception as e:
            return {
                'success': False,
                'error': f"Unexpected error: {str(e)}"
            }
    
    def cleanup_temp_files(self, file_path: str) -> bool:
        """
        Clean up temporary files
        
        Args:
            file_path: Path to the file to delete
            
        Returns:
            True if successful, False otherwise
        """
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
            return True
        except Exception:
            return False


# Convenience functions for quick usage
def download_video(url: str, output_path: Optional[str] = None, **kwargs) -> Dict[str, Any]:
    """Quick function to download a video"""
    downloader = YouTubeDownloader()
    return downloader.download_video(url, output_path, **kwargs)


def download_audio(url: str, output_path: Optional[str] = None, **kwargs) -> Dict[str, Any]:
    """Quick function to download audio"""
    downloader = YouTubeDownloader()
    return downloader.download_audio(url, output_path, **kwargs)


def get_video_info(url: str) -> Dict[str, Any]:
    """Quick function to get video info"""
    downloader = YouTubeDownloader()
    return downloader.get_video_info(url)


def get_available_formats(url: str) -> Dict[str, Any]:
    """Quick function to get available formats"""
    downloader = YouTubeDownloader()
    return downloader.get_available_formats(url) 