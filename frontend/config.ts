export const config = {
  // Backend API URL - update this for production deployment
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000',
  
  // App configuration
  appName: 'YouTube Video Downloader',
  appDescription: 'Download YouTube videos easily and quickly',
  
  // Feature flags
  enableStats: true,
  enableTestimonials: true,
}
