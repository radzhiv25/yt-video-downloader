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

**Optional (for Supabase features):**
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Build Configuration

The project uses:
- `output: 'export'` for static generation
- `trailingSlash: true` for Cloudflare compatibility
- `images.unoptimized: true` for static export

### Dependencies

The frontend requires these key dependencies:
- `@supabase/supabase-js` - for database features (optional)
- `clsx` and `tailwind-merge` - for utility functions
- `lucide-react` - for icons
- `@radix-ui/*` - for UI components

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
- Supabase features are optional and will use placeholder data if not configured

### Custom Domain

After deployment, you can add a custom domain in Cloudflare Pages settings.

### Troubleshooting

If you encounter build errors:
1. Ensure all dependencies are properly installed
2. Check that the lib/utils.ts and lib/supabaseClient.ts files exist
3. Verify environment variables are set correctly
4. The app gracefully handles missing Supabase configuration
