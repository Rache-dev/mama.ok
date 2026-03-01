# Mama - Pregnancy Support Platform (Frontend)

Beautiful, responsive Next.js application for the Mama pregnancy support platform.

## 🚀 Features

- **Modern UI** - Built with Next.js 14, TypeScript, and Tailwind CSS
- **shadcn/ui Components** - Beautiful, accessible UI components
- **Real-time Chat** - Socket.io integration for live messaging
- **Responsive Design** - Mobile-first, works on all devices
- **State Management** - Zustand for efficient state management
- **Type Safety** - Full TypeScript implementation
- **Optimized Images** - Next.js Image optimization

## 📋 Prerequisites

- Node.js 18+ and npm
- Backend API running on port 5000

## 🛠️ Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - `.env.local` is already configured for local development
   - Update `NEXT_PUBLIC_API_URL` if your backend is on a different port
   - Update `NEXT_PUBLIC_SOCKET_URL` for WebSocket connection

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```

Visit `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js 14 App Router
│   │   ├── page.tsx        # Landing page
│   │   ├── login/          # Authentication
│   │   ├── register/
│   │   ├── dashboard/      # Main dashboard
│   │   ├── symptoms/       # Symptom checker
│   │   ├── wellness/       # Wellness guide
│   │   ├── consultants/    # Find consultants
│   │   ├── chat/           # Real-time chat
│   │   ├── hospitals/      # Hospital finder
│   │   ├── search/         # Global search
│   │   ├── careers/        # Careers page
│   │   ├── profile/        # User profile
│   │   └── terms/          # Terms & conditions
│   ├── components/
│   │   ├── ui/             # shadcn/ui components
│   │   └── Navigation.tsx  # Main navigation
│   ├── lib/
│   │   ├── api.ts          # API client
│   │   └── utils.ts        # Utility functions
│   └── store/
│       └── authStore.ts    # Auth state management
├── public/                  # Static assets
└── package.json
```

## 🎨 UI Theme

The application uses a warm, motherly color palette:
- **Primary**: Pink (#EC4899)
- **Secondary**: Purple (#A855F7)
- **Accent**: Rose (#FB7185)

Custom gradients and soft colors create a welcoming, feminine atmosphere.

## 📱 Pages Overview

### Public Pages
- **Landing Page** (`/`) - Marketing page with features
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - User registration with terms acceptance
- **Careers** (`/careers`) - Job opportunities
- **Terms** (`/terms`) - Terms and conditions

### Protected Pages (Require Authentication)
- **Dashboard** (`/dashboard`) - Personal pregnancy journey overview
- **Symptoms** (`/symptoms`) - Month-by-month symptom checker
- **Wellness** (`/wellness`) - Nutrition, exercise, sleep, media recommendations
- **Consultants** (`/consultants`) - Browse and connect with healthcare professionals
- **Chat** (`/chat`) - Real-time messaging with consultants
- **Hospitals** (`/hospitals`) - Find and select maternity hospitals
- **Search** (`/search`) - Global search across all content
- **Profile** (`/profile`) - Manage account and pregnancy information

## 🔐 Authentication

- JWT-based authentication
- Automatic token refresh
- Protected routes redirect to login
- Persistent auth state with localStorage

## 🎯 Key Features

### Symptom Checker
- Filter by month (1-9)
- Search functionality
- "Is this normal?" logic
- Severity indicators
- Recommendations for each symptom

### Wellness Guide
- Month-specific recommendations
- Categories: Food, Exercise, Sleep, Books, Movies, Podcasts
- Detailed nutritional information
- Exercise videos and precautions
- Entertainment recommendations

### Consultant Matching
- Browse verified healthcare professionals
- Filter by specialization
- Real-time availability
- Rating and review system
- Direct chat initiation

### Real-time Chat
- Instant messaging
- Message history
- Read receipts
- Multiple conversation management

### Hospital Finder
- Geolocation support
- Facility listings
- Ratings and reviews
- Contact information
- Selection for delivery

## 🌐 API Integration

All API calls go through the centralized `api.ts` client:
- Automatic authentication header injection
- Error handling and token refresh
- Type-safe requests with TypeScript

## 🚀 Production Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables for Production
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_SOCKET_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_NAME=Mama - Pregnancy Support Platform
```

## 📊 Performance Optimizations

- Next.js automatic code splitting
- Image optimization with next/image
- Font optimization with next/font
- Lazy loading of components
- Memoization where appropriate

## ♿ Accessibility

- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly
- Color contrast compliance
- Focus indicators

## 📝 Payment Methods Display

The application displays the following payment methods:
- Credit Cards (Visa, Mastercard, American Express)
- Debit Cards
- PayPal
- Bank Transfers

Note: This is display-only. Payment integration is not implemented.

## 🧪 Testing

```bash
# Type checking
npx tsc --noEmit

# Build test
npm run build
```

## 📱 Mobile Responsiveness

- Responsive navigation
- Touch-friendly interfaces
- Optimized for all screen sizes
- Progressive Web App ready

## 📝 License

Proprietary - Mama Platform 2026

## 👥 Support

For issues or questions:
- Email: support@mama.com
- Documentation: https://docs.mama.com
