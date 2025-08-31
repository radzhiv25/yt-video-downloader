# YouTube Downloader Frontend

This is the frontend for the YouTube Downloader application built with Next.js.

## Features

- Modern, responsive UI built with Tailwind CSS
- Real-time user rating calculation based on testimonials
- Testimonial system with star ratings
- Statistics dashboard
- YouTube video and audio download functionality

## User Rating System

The user rating is now dynamically calculated based on the average rating from all testimonials in the database. This replaces the previous hardcoded rating system.

### How it works:

1. **Backend Calculation**: The backend calculates the average rating from all testimonials in the `testimonials` table
2. **Automatic Updates**: The rating is automatically updated whenever a new testimonial is added
3. **Real-time Display**: The frontend displays the calculated rating in real-time

### Backend Endpoints:

- `GET /stats` - Returns current stats including calculated user rating
- `POST /update-user-rating` - Recalculates and updates the user rating

## Environment Configuration

Create a `.env.local` file in the frontend directory with:

```bash
# Backend URL for API calls
BACKEND_URL=http://localhost:8000

# Supabase configuration (already configured in your project)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Development

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:3000`.

## Database Schema

### Stats Table
- `id` - Primary key
- `downloads_today` - Number of downloads today
- `happy_users` - Number of happy users
- `system_uptime` - System uptime percentage
- `user_rating` - Calculated average rating from testimonials

### Testimonials Table
- `id` - Primary key
- `name` - User's name
- `role` - User's role/occupation
- `content` - Testimonial text
- `rating` - User's rating (1-5 stars)
- `created_at` - Timestamp when testimonial was created
