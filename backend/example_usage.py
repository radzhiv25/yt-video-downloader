#!/usr/bin/env python3
"""
Example usage of the YouTube Downloader Library
"""

import os
import sys
from youtube_downloader_lib import (
    YouTubeDownloader,
    download_video,
    download_audio,
    get_video_info,
    get_available_formats
)

def example_basic_usage():
    """Demonstrate basic usage with convenience functions"""
    print("=== Basic Usage Example ===")
    
    # Example YouTube URL (replace with a real one)
    url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    
    # Get video info first
    print("Getting video information...")
    info = get_video_info(url)
    if info['success']:
        print(f"Title: {info['title']}")
        print(f"Duration: {info['duration']} seconds")
        print(f"Uploader: {info['uploader']}")
    else:
        print(f"Failed to get info: {info['error']}")
        return
    
    # Download video
    print("\nDownloading video...")
    result = download_video(url, output_path="example_video.mp4")
    if result['success']:
        print(f"Successfully downloaded: {result['file_path']}")
        print(f"File size: {os.path.getsize(result['file_path'])} bytes")
        
        # Clean up
        os.remove(result['file_path'])
        print("Cleaned up downloaded file")
    else:
        print(f"Download failed: {result['error']}")
    
    # Download audio
    print("\nDownloading audio...")
    result = download_audio(url, output_path="example_audio.mp3")
    if result['success']:
        print(f"Successfully downloaded audio: {result['file_path']}")
        print(f"File size: {os.path.getsize(result['file_path'])} bytes")
        
        # Clean up
        os.remove(result['file_path'])
        print("Cleaned up downloaded audio file")
    else:
        print(f"Audio download failed: {result['error']}")


def example_advanced_usage():
    """Demonstrate advanced usage with the YouTubeDownloader class"""
    print("\n=== Advanced Usage Example ===")
    
    # Create downloader instance with custom temp directory
    temp_dir = "./temp_downloads"
    downloader = YouTubeDownloader(temp_dir=temp_dir)
    
    # Example URL
    url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    
    # Get available formats
    print("Getting available formats...")
    formats = downloader.get_available_formats(url)
    if formats['success']:
        print("Available video formats:")
        for fmt in formats['video_formats'][:3]:  # Show first 3
            print(f"  {fmt['format_id']}: {fmt['height']}p {fmt['ext']}")
        
        print("Available audio formats:")
        for fmt in formats['audio_formats'][:3]:  # Show first 3
            print(f"  {fmt['format_id']}: {fmt['abr']}kbps {fmt['ext']}")
    
    # Download with custom options
    print("\nDownloading with custom options...")
    result = downloader.download_video(
        url=url,
        output_path="custom_video.mp4",
        format="136+251",  # 720p instead of 1080p
        merge_format="mp4"
    )
    
    if result['success']:
        print(f"Successfully downloaded: {result['file_path']}")
        print(f"Title: {result['title']}")
        print(f"Duration: {result['duration']} seconds")
        
        # Clean up
        downloader.cleanup_temp_files(result['file_path'])
        print("Cleaned up downloaded file")
    else:
        print(f"Download failed: {result['error']}")
    
    # Clean up temp directory
    if os.path.exists(temp_dir):
        import shutil
        shutil.rmtree(temp_dir)
        print(f"Cleaned up temp directory: {temp_dir}")


def example_error_handling():
    """Demonstrate error handling"""
    print("\n=== Error Handling Example ===")
    
    # Test with invalid URL
    invalid_url = "https://www.youtube.com/watch?v=invalid_video_id"
    
    result = download_video(invalid_url)
    if not result['success']:
        print(f"Expected error for invalid URL: {result['error']}")
    
    # Test with non-YouTube URL
    non_youtube_url = "https://www.google.com"
    
    result = download_video(non_youtube_url)
    if not result['success']:
        print(f"Expected error for non-YouTube URL: {result['error']}")


def example_batch_processing():
    """Demonstrate batch processing"""
    print("\n=== Batch Processing Example ===")
    
    # List of URLs to process
    urls = [
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        # Add more URLs here
    ]
    
    downloader = YouTubeDownloader()
    
    for i, url in enumerate(urls):
        print(f"Processing video {i+1}/{len(urls)}...")
        
        # Get info first
        info = get_video_info(url)
        if not info['success']:
            print(f"  Skipping: {info['error']}")
            continue
        
        print(f"  Title: {info['title']}")
        
        # Download video
        result = downloader.download_video(
            url,
            output_path=f"batch_video_{i+1}.mp4"
        )
        
        if result['success']:
            print(f"  Downloaded: {result['file_path']}")
            # Clean up
            downloader.cleanup_temp_files(result['file_path'])
        else:
            print(f"  Failed: {result['error']}")


if __name__ == "__main__":
    print("YouTube Downloader Library - Example Usage")
    print("=" * 50)
    
    try:
        # Run examples
        example_basic_usage()
        example_advanced_usage()
        example_error_handling()
        example_batch_processing()
        
        print("\n" + "=" * 50)
        print("All examples completed!")
        
    except KeyboardInterrupt:
        print("\n\nInterrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n\nUnexpected error: {e}")
        sys.exit(1) 