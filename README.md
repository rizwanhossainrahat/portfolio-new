# Portfolio Frontend

Live Link:https://portfolio-new-sigma-hazel.vercel.app

A modern portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. This frontend connects to a Node.js/Express backend API for user authentication, project management, and blog functionality.

## Features

- 🔐 **Authentication System** - JWT-based auth with httpOnly cookies
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🎨 **Modern UI** - Built with shadcn/ui components
- 🌙 **Dark Mode** - Theme switching with next-themes
- 📊 **Dashboard** - User dashboard for managing projects and blogs
- 🚀 **Project Showcase** - Display and manage portfolio projects
- 📝 **Blog System** - Create and manage blog posts
- 🔒 **Protected Routes** - Role-based access control
- 📧 **Form Validation** - Zod schema validation with react-hook-form

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui + Radix UI
- **Forms:** React Hook Form + Zod
- **State Management:** React Context + Hooks
- **Icons:** Lucide React
- **Notifications:** Sonner

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running (see backend documentation)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your backend API URL:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public routes (no auth required)
│   │   ├── (auth)/        # Authentication pages
│   │   ├── about/         # About page
│   │   ├── blog/          # Blog pages
│   │   ├── contact/       # Contact page
│   │   ├── project/       # Project showcase
│   │   └── page.tsx       # Homepage
│   ├── dashboard/         # Protected dashboard routes
│   │   ├── projects/      # Project management
│   │   ├── profile/       # User profile
│   │   └── page.tsx       # Dashboard overview
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── Auth/             # Authentication components
│   ├── Blog/             # Blog components
│   ├── Projects/         # Project components
│   ├── providers/        # Context providers
│   ├── shared/           # Shared components
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configs
├── services/             # API service functions
└── types/                # TypeScript type definitions
```

## API Integration

The frontend communicates with the backend through a centralized API client (`src/lib/api.ts`) that handles:

- Authentication with httpOnly cookies
- Error handling and response parsing
- Request/response interceptors
- Automatic credential inclusion

### Key API Endpoints

- **Authentication:** `/login`, `/logout`, `/create-user`
- **User Management:** `/me`, `/update`, `/users`
- **Projects:** `/project`, `/create-project`, `/projects-user`
- **Blogs:** `/blogs`, `/create-blog`, `/blog/:id`

## Authentication Flow

1. **Login/Register** - User submits credentials
2. **Cookie Storage** - Backend sets httpOnly cookies
3. **Auto-Authentication** - Frontend checks auth status on load
4. **Protected Routes** - Redirect to login if not authenticated
5. **Role-Based Access** - Admin/User role restrictions

## Key Features

### Dashboard
- Overview of user's projects and blogs
- Quick stats and recent activity
- Easy navigation to management pages

### Project Management
- Create, edit, and delete projects
- Image uploads and demo links
- Source code repository links
- Public project showcase

### User Profile
- Update personal information
- Social media links
- Avatar and bio management

### Responsive Design
- Mobile-first approach
- Collapsible navigation
- Optimized for all screen sizes

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Style

- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Tailwind CSS** for styling

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

```env
# Required
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# Optional (for production)
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue on GitHub or contact the development team.
