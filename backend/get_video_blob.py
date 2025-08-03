#!/usr/bin/env python3
"""
Example: How to get video blobs for use in other applications
"""

import os
import base64
from youtube_downloader_lib import YouTubeDownloader, download_video, download_audio

def get_video_as_blob(url: str, format: str = '137+251') -> dict:
    """
    Download a video and return it as a base64 encoded blob
    
    Args:
        url: YouTube video URL
        format: Video format (default: '137+251' for 1080p)
        
    Returns:
        Dict containing:
            - success: bool
            - blob: str (base64 encoded video data)
            - filename: str (suggested filename)
            - mime_type: str (MIME type)
            - error: str (error message if failed)
    """
    # Download the video
    result = download_video(url, format=format)
    
    if not result['success']:
        return {
            'success': False,
            'error': result['error']
        }
    
    try:
        # Read the file and encode as base64
        with open(result['file_path'], 'rb') as f:
            video_data = f.read()
        
        # Encode as base64
        blob = base64.b64encode(video_data).decode('utf-8')
        
        # Clean up the temporary file
        os.remove(result['file_path'])
        
        return {
            'success': True,
            'blob': blob,
            'filename': result['title'] + '.mp4',
            'mime_type': 'video/mp4',
            'title': result['title'],
            'duration': result['duration'],
            'file_size': len(video_data)
        }
        
    except Exception as e:
        # Clean up on error
        if os.path.exists(result['file_path']):
            os.remove(result['file_path'])
        
        return {
            'success': False,
            'error': f"Failed to create blob: {str(e)}"
        }

def get_audio_as_blob(url: str, codec: str = 'mp3', quality: str = '192') -> dict:
    """
    Download audio and return it as a base64 encoded blob
    
    Args:
        url: YouTube video URL
        codec: Audio codec (default: 'mp3')
        quality: Audio quality (default: '192')
        
    Returns:
        Dict containing:
            - success: bool
            - blob: str (base64 encoded audio data)
            - filename: str (suggested filename)
            - mime_type: str (MIME type)
            - error: str (error message if failed)
    """
    # Download the audio
    result = download_audio(url, codec=codec, quality=quality)
    
    if not result['success']:
        return {
            'success': False,
            'error': result['error']
        }
    
    try:
        # Read the file and encode as base64
        with open(result['file_path'], 'rb') as f:
            audio_data = f.read()
        
        # Encode as base64
        blob = base64.b64encode(audio_data).decode('utf-8')
        
        # Clean up the temporary file
        os.remove(result['file_path'])
        
        return {
            'success': True,
            'blob': blob,
            'filename': result['title'] + f'.{codec}',
            'mime_type': f'audio/{codec}',
            'title': result['title'],
            'duration': result['duration'],
            'file_size': len(audio_data)
        }
        
    except Exception as e:
        # Clean up on error
        if os.path.exists(result['file_path']):
            os.remove(result['file_path'])
        
        return {
            'success': False,
            'error': f"Failed to create blob: {str(e)}"
        }

def save_blob_to_file(blob_data: str, filename: str) -> bool:
    """
    Save a base64 blob to a file
    
    Args:
        blob_data: Base64 encoded data
        filename: Output filename
        
    Returns:
        True if successful, False otherwise
    """
    try:
        # Decode base64 data
        file_data = base64.b64decode(blob_data)
        
        # Write to file
        with open(filename, 'wb') as f:
            f.write(file_data)
        
        return True
    except Exception as e:
        print(f"Error saving blob to file: {e}")
        return False

def example_usage():
    """Example of how to use the blob functions"""
    print("=== Video/Audio Blob Example ===")
    
    # Example URL
    url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    
    # Get video as blob
    print("Getting video as blob...")
    video_blob = get_video_as_blob(url)
    
    if video_blob['success']:
        print(f"✓ Video blob created successfully")
        print(f"  Title: {video_blob['title']}")
        print(f"  Duration: {video_blob['duration']} seconds")
        print(f"  File size: {video_blob['file_size']} bytes")
        print(f"  Blob size: {len(video_blob['blob'])} characters")
        
        # Save to file (optional)
        if save_blob_to_file(video_blob['blob'], video_blob['filename']):
            print(f"  Saved to: {video_blob['filename']}")
            # Clean up
            os.remove(video_blob['filename'])
            print(f"  Cleaned up: {video_blob['filename']}")
    else:
        print(f"✗ Failed to get video blob: {video_blob['error']}")
    
    # Get audio as blob
    print("\nGetting audio as blob...")
    audio_blob = get_audio_as_blob(url)
    
    if audio_blob['success']:
        print(f"✓ Audio blob created successfully")
        print(f"  Title: {audio_blob['title']}")
        print(f"  Duration: {audio_blob['duration']} seconds")
        print(f"  File size: {audio_blob['file_size']} bytes")
        print(f"  Blob size: {len(audio_blob['blob'])} characters")
        
        # Save to file (optional)
        if save_blob_to_file(audio_blob['blob'], audio_blob['filename']):
            print(f"  Saved to: {audio_blob['filename']}")
            # Clean up
            os.remove(audio_blob['filename'])
            print(f"  Cleaned up: {audio_blob['filename']}")
    else:
        print(f"✗ Failed to get audio blob: {audio_blob['error']}")

def example_web_integration():
    """Example of how to integrate with web applications"""
    print("\n=== Web Integration Example ===")
    
    url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    
    # Get video blob
    result = get_video_as_blob(url)
    
    if result['success']:
        # This is how you might use it in a web application
        print("For web applications, you can:")
        print("1. Return the blob in a JSON response:")
        print("   return {'blob': result['blob'], 'filename': result['filename']}")
        
        print("2. Create a data URL for direct use in HTML:")
        data_url = f"data:{result['mime_type']};base64,{result['blob']}"
        print(f"   data_url = 'data:{result['mime_type']};base64,{result['blob'][:50]}...'")
        
        print("3. Use in JavaScript:")
        print("   const video = document.createElement('video');")
        print("   video.src = data_url;")
        print("   document.body.appendChild(video);")
        
        print("4. Download via browser:")
        print("   const link = document.createElement('a');")
        print("   link.href = data_url;")
        print("   link.download = result['filename'];")
        print("   link.click();")

if __name__ == "__main__":
    example_usage()
    example_web_integration()
    
    print("\n" + "=" * 50)
    print("Blob examples completed!")
    print("\nThe blob data can be used in:")
    print("- Web applications (data URLs)")
    print("- API responses")
    print("- File downloads")
    print("- Database storage")
    print("- Cross-platform applications") 