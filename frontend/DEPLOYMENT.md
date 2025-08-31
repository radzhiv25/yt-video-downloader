# Frontend Deployment Guide

## Cloudflare Pages Deployment

This frontend is configured for static export and can be deployed to Cloudflare Pages.

### Prerequisites

1. **Backend API**: Ensure your Python backend is deployed and accessible
2. **Environment Variables**: Set the backend URL in Cloudflare Pages

### Environment Variables

In your Cloudflare Pages project settings, add:

```
NEXT_PUBLIC_BACKEND_URL=https://your-backend-domain.com
```

### Build Configuration

The project uses:
- `output: 'export'` for static generation
- `trailingSlash: true` for Cloudflare compatibility
- `images.unoptimized: true` for static export

### Deployment Steps

1. **Connect Repository**: Link your GitHub repository to Cloudflare Pages
2. **Build Settings**:
   - Build command: `npm install && npm run build`
   - Build output directory: `out`
   - Node.js version: 18 or higher
3. **Environment Variables**: Add the backend URL
4. **Deploy**: Trigger the deployment

### Static Export Notes

- API routes are not supported in static export
- Backend calls are made directly from the client
- Ensure CORS is configured on your backend
- The app will fall back to placeholder data if backend is unavailable

### Custom Domain

After deployment, you can add a custom domain in Cloudflare Pages settings.
