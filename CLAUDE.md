# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VideoHub is an AI Video Creator Talent Hub - a professional marketplace platform connecting agencies with AI video creation talent. The platform supports two distinct user types (agencies and talent creators) with different workflows and views.

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS with PostCSS
- **Icons**: Lucide React
- **Linting**: ESLint with TypeScript support

## Development Commands

```bash
# Start development server (runs on http://localhost:5173 by default)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Architecture

### Application Structure

```
src/
├── main.tsx           # Application entry point
├── App.tsx            # Root component with routing and global state
├── index.css          # Global styles and Tailwind imports
├── types/
│   └── index.ts       # TypeScript type definitions
├── components/
│   └── Navigation.tsx # Main navigation component
└── pages/
    ├── LandingPage.tsx      # Public landing page
    ├── TalentDiscovery.tsx  # Browse talent/projects
    ├── TalentProfile.tsx    # Individual talent profile view
    ├── ProjectPosting.tsx   # Create new project postings
    └── Dashboard.tsx        # User dashboard (agency/talent)
```

### State Management

The application uses React's built-in state management with hooks:
- **Global state** is managed in `App.tsx` via `useState`
- **User type** (`agency` | `talent`) determines the UI behavior throughout the app
- **Authentication state** is a simple boolean flag (no real auth implemented yet)
- State is passed down through props to child components

### Routing Structure

- `/` - Landing page (public)
- `/discover` - Talent discovery (agencies) or project browsing (talent)
- `/talent/:id` - Individual talent profile view
- `/post-project` - Project posting form (agencies)
- `/dashboard` - User dashboard (view differs by user type)

Navigation items and page content adapt based on the `userType` state.

### Key Type Definitions

Located in `src/types/index.ts`:
- **UserType**: `'agency' | 'talent'` - defines the two user roles
- **TalentProfile**: Complete talent profile with portfolio, certifications, testimonials
- **Project**: Project listing with requirements, budget, timeline
- **PortfolioItem**: Individual portfolio pieces with video metadata
- **Certification**: Professional certifications
- **Testimonial**: Client reviews and ratings

### Component Patterns

- All pages receive `userType` as a prop to conditionally render content
- Navigation component handles user type switching via a toggle button
- Mock authentication is handled via simple state flags
- Pages use inline component definitions (no separate component files yet)

### Styling Approach

- Tailwind utility classes are used throughout
- Responsive design with mobile-first approach
- Color scheme: Blue primary (`blue-600`), gray neutrals
- All pages use max-width containers (`max-w-7xl`) for consistent layout
- Icons from Lucide React provide consistent visual language

## Current Limitations

- No real authentication system (placeholder buttons)
- No backend API integration (all data is mocked in components)
- User type switching affects the entire app view instantly (no profile-based persistence)
- No state persistence (refreshing resets to default state)
