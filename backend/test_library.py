#!/usr/bin/env python3
"""
Simple test script for the YouTube Downloader Library
"""

import sys
import os

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from youtube_downloader_lib import (
    YouTubeDownloader,
    download_video,
    download_audio,
    get_video_info,
    get_available_formats
)

def test_import():
    """Test that the library can be imported"""
    print("✓ Library imported successfully")

def test_downloader_creation():
    """Test creating a YouTubeDownloader instance"""
    try:
        downloader = YouTubeDownloader()
        print("✓ YouTubeDownloader instance created successfully")
        return downloader
    except Exception as e:
        print(f"✗ Failed to create YouTubeDownloader: {e}")
        return None

def test_video_info():
    """Test getting video info (without downloading)"""
    # Use a short, public YouTube video for testing
    test_url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    
    try:
        info = get_video_info(test_url)
        if info['success']:
            print(f"✓ Video info retrieved successfully")
            print(f"  Title: {info['title'][:50]}...")
            print(f"  Duration: {info['duration']} seconds")
            print(f"  Uploader: {info['uploader']}")
        else:
            print(f"✗ Failed to get video info: {info['error']}")
    except Exception as e:
        print(f"✗ Exception getting video info: {e}")

def test_available_formats():
    """Test getting available formats"""
    test_url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    
    try:
        formats = get_available_formats(test_url)
        if formats['success']:
            print(f"✓ Available formats retrieved successfully")
            print(f"  Video formats: {len(formats['video_formats'])}")
            print(f"  Audio formats: {len(formats['audio_formats'])}")
        else:
            print(f"✗ Failed to get formats: {formats['error']}")
    except Exception as e:
        print(f"✗ Exception getting formats: {e}")

def test_downloader_methods():
    """Test the YouTubeDownloader class methods"""
    downloader = test_downloader_creation()
    if not downloader:
        return
    
    test_url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    
    # Test get_video_info method
    try:
        info = downloader.get_video_info(test_url)
        if info['success']:
            print("✓ YouTubeDownloader.get_video_info() works")
        else:
            print(f"✗ YouTubeDownloader.get_video_info() failed: {info['error']}")
    except Exception as e:
        print(f"✗ Exception in get_video_info(): {e}")
    
    # Test get_available_formats method
    try:
        formats = downloader.get_available_formats(test_url)
        if formats['success']:
            print("✓ YouTubeDownloader.get_available_formats() works")
        else:
            print(f"✗ YouTubeDownloader.get_available_formats() failed: {formats['error']}")
    except Exception as e:
        print(f"✗ Exception in get_available_formats(): {e}")

def test_cleanup():
    """Test cleanup functionality"""
    downloader = YouTubeDownloader()
    
    # Create a temporary file
    temp_file = "/tmp/test_cleanup.txt"
    try:
        with open(temp_file, 'w') as f:
            f.write("test")
        
        # Test cleanup
        result = downloader.cleanup_temp_files(temp_file)
        if result:
            print("✓ Cleanup functionality works")
        else:
            print("✗ Cleanup functionality failed")
    except Exception as e:
        print(f"✗ Exception in cleanup test: {e}")

def main():
    """Run all tests"""
    print("YouTube Downloader Library - Test Suite")
    print("=" * 50)
    
    test_import()
    test_downloader_creation()
    test_video_info()
    test_available_formats()
    test_downloader_methods()
    test_cleanup()
    
    print("\n" + "=" * 50)
    print("Test suite completed!")
    print("\nNote: Download tests are not included to avoid actual downloads.")
    print("To test downloads, run the example_usage.py script.")

if __name__ == "__main__":
    main() 