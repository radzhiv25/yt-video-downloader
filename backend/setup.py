from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="youtube-downloader-lib",
    version="1.0.0",
    author="Your Name",
    author_email="your.email@example.com",
    description="A reusable library for downloading YouTube videos and audio",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/yourusername/youtube-downloader",
    packages=find_packages(),
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Topic :: Multimedia :: Video",
        "Topic :: Software Development :: Libraries :: Python Modules",
    ],
    python_requires=">=3.7",
    install_requires=[
        "yt-dlp>=2023.1.6",
        "pathlib2;python_version<'3.4'",
    ],
    extras_require={
        "dev": [
            "pytest>=6.0",
            "pytest-cov>=2.0",
            "black>=21.0",
            "flake8>=3.8",
            "mypy>=0.800",
        ],
    },
    keywords="youtube download video audio library",
    project_urls={
        "Bug Reports": "https://github.com/yourusername/youtube-downloader/issues",
        "Source": "https://github.com/yourusername/youtube-downloader",
        "Documentation": "https://github.com/yourusername/youtube-downloader#readme",
    },
) 