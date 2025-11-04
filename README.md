# VideoHub - AI Video Creator Talent Hub

> A professional marketplace platform connecting agencies with AI video creation talent

[![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

## 🎯 Overview

VideoHub is an innovative marketplace platform specifically designed for AI video creation professionals. It bridges the gap between agencies seeking AI video talent and creators who specialize in cutting-edge AI video generation tools like Runway ML, Midjourney Video, Stable Video Diffusion, and more.

The platform supports two distinct user types with tailored experiences:
- **Agencies**: Post projects, discover talent, manage collaborations
- **Talent Creators**: Browse projects, showcase portfolios, build client relationships

## ✨ Features

### For Agencies
- 🔍 **Talent Discovery** - Browse and filter AI video creators by skills, tools, and availability
- 📋 **Project Posting** - Create detailed project listings with budget, timeline, and requirements
- 📊 **Dashboard** - Track active projects, proposals, and spending analytics
- ⭐ **Verified Talent** - Access pre-vetted creators with portfolios and certifications
- 💬 **Direct Communication** - Message and collaborate with talent

### For Talent Creators
- 🎨 **Portfolio Showcase** - Display AI-generated video projects with detailed metadata
- 💼 **Project Browsing** - Find opportunities matching skills and tool expertise
- 📈 **Performance Tracking** - Monitor earnings, ratings, and client relationships
- 🏆 **Certifications** - Showcase verified credentials for AI tools
- 👥 **Client Reviews** - Build reputation through testimonials and ratings

### Platform Features
- 🎭 **Dual User Views** - Seamlessly switch between agency and talent perspectives
- 📱 **Responsive Design** - Mobile-first approach for all screen sizes
- 🎨 **Modern UI** - Clean, professional interface with Tailwind CSS
- 🚀 **Fast Performance** - Built with Vite for optimal development and build speeds
- 🔄 **Dynamic Routing** - React Router for smooth navigation

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern UI library with hooks
- **TypeScript 5.5.3** - Type-safe development
- **Vite 5.4.2** - Next-generation build tool
- **React Router DOM 7.6.3** - Client-side routing

### Styling
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **PostCSS 8.4.35** - CSS processing
- **Autoprefixer 10.4.18** - Browser compatibility

### UI Components
- **Lucide React 0.344.0** - Beautiful icon library

### Development Tools
- **ESLint 9.9.1** - Code linting
- **TypeScript ESLint 8.3.0** - TypeScript-specific linting
- **Vite Plugin React 4.3.1** - React Fast Refresh

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/budprat/VideoHub.git
   cd VideoHub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

### Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 📁 Project Structure

```
VideoHub/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   └── Navigation.tsx # Main navigation bar
│   ├── pages/            # Page components
│   │   ├── LandingPage.tsx      # Public homepage
│   │   ├── TalentDiscovery.tsx  # Browse talent/projects
│   │   ├── TalentProfile.tsx    # Individual talent profiles
│   │   ├── ProjectPosting.tsx   # Create project listings
│   │   └── Dashboard.tsx        # User dashboard
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts      # Core types (UserType, TalentProfile, Project, etc.)
│   ├── App.tsx           # Root component with routing
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🎭 User Types & Workflows

### Agency Workflow
1. **Landing Page** → Sign up as Agency
2. **Discover Talent** → Browse AI video creators
3. **View Profiles** → Review portfolios, certifications, testimonials
4. **Post Project** → Create detailed project listing
5. **Dashboard** → Manage projects and review proposals
6. **Hire & Collaborate** → Work with selected talent

### Talent Workflow
1. **Landing Page** → Join as Creator
2. **Browse Projects** → Find opportunities matching skills
3. **Submit Proposals** → Apply to relevant projects
4. **Dashboard** → Track active work and earnings
5. **Build Portfolio** → Showcase completed projects
6. **Grow Reputation** → Earn ratings and testimonials

## 🔑 Key Features Explained

### State Management
- Global state managed in `App.tsx` using React hooks
- User type (`agency` | `talent`) determines UI behavior
- Authentication state (currently placeholder)
- Props drilling for state distribution

### Type Safety
All core entities are strongly typed:
```typescript
// User Types
type UserType = 'agency' | 'talent';

// Talent Profile with portfolio and certifications
interface TalentProfile {
  id: string;
  name: string;
  title: string;
  skills: string[];
  aiTools: string[];
  portfolio: PortfolioItem[];
  certifications: Certification[];
  testimonials: Testimonial[];
  // ... more fields
}

// Project Listings
interface Project {
  title: string;
  description: string;
  budget: string;
  requiredSkills: string[];
  requiredTools: string[];
  complexity: 'simple' | 'moderate' | 'complex';
  // ... more fields
}
```

### Routing Structure
- `/` - Landing page (public)
- `/discover` - Talent discovery (agencies) / Project browsing (talent)
- `/talent/:id` - Individual talent profile
- `/post-project` - Project posting form (agencies)
- `/dashboard` - User dashboard (adaptive based on user type)

## 🎨 Design System

### Color Palette
- **Primary**: Blue (`blue-600`) - Trust, professionalism
- **Secondary**: Purple (`purple-600`) - Creativity, innovation
- **Success**: Green (`green-500`) - Availability, completion
- **Warning**: Yellow (`yellow-500`) - Busy status
- **Neutrals**: Gray scale for backgrounds and text

### Typography
- **Headings**: Bold, large sizes for hierarchy
- **Body**: Medium weight, comfortable reading size
- **UI Elements**: Semibold for buttons and labels

### Components
- Rounded corners (`rounded-lg`, `rounded-xl`)
- Consistent spacing with Tailwind utilities
- Hover states for interactive elements
- Shadow elevations for depth
- Responsive grid layouts

## 🚧 Current Limitations

This is a **frontend prototype** with the following limitations:
- ❌ No real authentication system (placeholder buttons only)
- ❌ No backend API (all data is mocked in components)
- ❌ No database integration
- ❌ User type switching affects entire app view (no profile persistence)
- ❌ No state persistence (refreshing resets state)
- ❌ No real payment processing
- ❌ No file upload functionality
- ❌ No real messaging system

## 🔮 Future Enhancements

### Phase 1: Backend Integration
- [ ] Set up backend API (Node.js/Express or Supabase)
- [ ] Implement real authentication (JWT, OAuth)
- [ ] Database design and integration
- [ ] User profile persistence

### Phase 2: Core Features
- [ ] Real-time messaging system
- [ ] File upload for portfolios and projects
- [ ] Payment integration (Stripe/PayPal)
- [ ] Advanced search and filtering
- [ ] Notification system

### Phase 3: Advanced Features
- [ ] AI-powered talent matching
- [ ] Video player integration
- [ ] Contract management
- [ ] Escrow payments
- [ ] Calendar scheduling
- [ ] Analytics dashboard

### Phase 4: Platform Growth
- [ ] Mobile app (React Native)
- [ ] Admin panel
- [ ] Multi-language support
- [ ] AI tool integrations (Runway API, etc.)
- [ ] Team collaboration features

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind utility classes for styling
- Maintain component modularity
- Add PropTypes or TypeScript interfaces
- Test responsive behavior
- Follow existing code style

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **BudPrat** - Initial work

## 🙏 Acknowledgments

- **Pexels** - For free stock images used in mockups
- **Lucide** - For beautiful icon set
- **Tailwind CSS** - For the excellent utility-first CSS framework
- **Vite** - For blazing fast development experience
- **React Team** - For the amazing UI library

## 📞 Support

For questions, issues, or feature requests:
- Open an issue on GitHub
- Contact: [Your contact information]

## 🔗 Links

- [Live Demo](#) (Coming soon)
- [Documentation](#) (Coming soon)
- [API Documentation](#) (Coming soon)

---

**Built with ❤️ for the AI video creation community**
