# 🎓 EduFlow - Learning Management System

A modern, comprehensive Learning Management System built with Next.js, featuring multi-role support, payment integration, and beautiful theme customization for optimal learning experiences.

![EduFlow Banner](https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## ✨ Features

### 🎨 **Beautiful Theme System**
- **6 Carefully Crafted Themes**: Light, Dark, Sepia, Forest, Ocean, and Lavender
- **Reading-Optimized**: Each theme designed for comfortable extended reading
- **Accessibility-First**: WCAG compliant with high contrast ratios
- **Smooth Transitions**: Elegant theme switching with animations

### 👥 **Multi-Role Support**
- **Students**: Course enrollment, progress tracking, assignments, quizzes
- **Teachers**: Course creation, content management, student analytics
- **Administrators**: Platform management, user oversight, revenue analytics

### 💳 **Payment Integration**
- **Multiple Gateways**: Stripe, Paystack, and Flutterwave support
- **Global Reach**: Multi-currency support for worldwide accessibility
- **Secure Processing**: PCI-compliant payment handling
- **Webhook Integration**: Real-time payment status updates

### 📚 **Course Management**
- **Rich Content Types**: Video, text, PDF, and audio lessons
- **Modular Structure**: Organized courses with modules and lessons
- **Progress Tracking**: Detailed analytics and completion metrics
- **Interactive Elements**: Quizzes, assignments, and discussions

### 🔧 **Technical Excellence**
- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Database**: Supabase with Row Level Security (RLS)
- **API Documentation**: Interactive Swagger UI
- **Responsive Design**: Mobile-first approach
- **Performance Optimized**: Fast loading and smooth interactions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Payment gateway accounts (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/eduflow-lms.git
   cd eduflow-lms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure Environment Variables**
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Payment Gateways (Optional)
   STRIPE_SECRET_KEY=sk_test_...
   PAYSTACK_SECRET_KEY=sk_test_...
   FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-...

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_APP_NAME=EduFlow
   ```

5. **Database Setup**
   - Create a new Supabase project
   - Run the database migrations (see [Database Schema](#database-schema))
   - Enable Row Level Security

6. **Start Development Server**
   ```bash
   npm run dev
   ```

7. **Visit the Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Documentation

### API Documentation
Interactive API documentation is available at `/api-docs` when running the application. Built with Swagger UI for easy testing and exploration.

### Database Schema
The application uses Supabase with the following main tables:
- `users` - User profiles and authentication
- `courses` - Course information and metadata
- `modules` - Course modules and organization
- `lessons` - Individual lesson content
- `enrollments` - Student course enrollments
- `progress` - Learning progress tracking
- `transactions` - Payment and billing records
- `quizzes` - Assessment and quiz data
- `assignments` - Assignment and submission tracking

### Theme System
```typescript
// Available themes
type Theme = 'light' | 'dark' | 'sepia' | 'forest' | 'ocean' | 'lavender';

// Usage
import { useTheme } from '@/lib/theme-provider';
const { theme, setTheme } = useTheme();
```

## 🎯 User Roles & Permissions

### Students
- Browse and enroll in courses
- Track learning progress
- Submit assignments and take quizzes
- Receive certificates upon completion
- Access course discussions and messaging

### Teachers
- Create and manage courses
- Upload various content types
- Create quizzes and assignments
- Monitor student progress
- Grade submissions and provide feedback

### Administrators
- Manage all users and courses
- Access platform analytics
- Configure payment settings
- Monitor system health
- Manage platform settings

## 💰 Payment Integration

### Supported Gateways
- **Stripe**: Global payment processing
- **Paystack**: African market focus
- **Flutterwave**: Pan-African payments

### Features
- Secure payment processing
- Multiple currency support
- Automatic enrollment upon payment
- Refund management
- Transaction history

## 🎨 Theme Customization

### Available Themes

| Theme | Description | Best For |
|-------|-------------|----------|
| **Light** | Clean and bright | Daytime learning |
| **Dark** | Easy on the eyes | Evening study sessions |
| **Sepia** | Warm, paper-like | Comfortable reading |
| **Forest** | Calming green tones | Reduced eye strain |
| **Ocean** | Cool blue palette | Focused concentration |
| **Lavender** | Soft purple hues | Relaxing environment |

### Custom Theme Creation
```css
.custom-theme {
  --background: your-background-color;
  --foreground: your-text-color;
  --primary: your-primary-color;
  /* Add more CSS variables */
}
```

## 🔧 Development

### Project Structure
```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   └── courses/           # Course pages
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── layout/           # Layout components
├── lib/                  # Utilities and services
│   ├── services/         # Business logic
│   ├── middleware/       # API middleware
│   └── supabase/         # Database client
└── public/               # Static assets
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Code Quality
- **TypeScript**: Full type safety
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality checks

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Static site deployment
- **Railway**: Full-stack deployment
- **DigitalOcean**: VPS deployment

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a service
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Lucide React](https://lucide.dev/) - Icon library

## 📞 Support

- **Documentation**: [docs.eduflow.com](https://docs.eduflow.com)
- **Community**: [Discord Server](https://discord.gg/eduflow)
- **Issues**: [GitHub Issues](https://github.com/yourusername/eduflow-lms/issues)
- **Email**: support@eduflow.com

## 🗺️ Roadmap

- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] AI-powered course recommendations
- [ ] Live streaming integration
- [ ] Offline content support
- [ ] Multi-language support
- [ ] Advanced proctoring features

---

<div align="center">
  <p>Built with ❤️ for educators and learners worldwide</p>
  <p>
    <a href="https://github.com/yourusername/eduflow-lms/stargazers">⭐ Star us on GitHub</a> •
    <a href="https://twitter.com/eduflow">🐦 Follow on Twitter</a> •
    <a href="https://eduflow.com">🌐 Visit Website</a>
  </p>
</div>