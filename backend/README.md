# Mama - Pregnancy Support Platform (Backend)

Enterprise-grade backend API for the Mama pregnancy support platform.

## 🚀 Features

- **Comprehensive Authentication System** - Secure JWT-based authentication
- **Real-time Chat** - Socket.io powered real-time messaging
- **Extensive Database** - 1000+ data points across all pregnancy stages
- **RESTful API** - Well-structured endpoints for all features
- **Security** - Helmet, rate limiting, and input validation
- **Scalability** - Designed to handle 1000-10000 transactions per day

## 📋 Prerequisites

- Node.js 18+ and npm
- MongoDB database
- Port 5000 available

## 🛠️ Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env` and update with your values
   - **Important**: Update `JWT_SECRET` with a strong secret key
   - MongoDB connection string is pre-configured

4. Seed the database:
```bash
npm run seed
```

This will populate your database with:
- 50 sample users
- 20 verified consultants
- 1000+ symptoms across all 9 months
- Comprehensive wellness recommendations
- 10 hospitals with geolocation
- Career listings

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Users
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update profile (protected)
- `PUT /api/users/pregnancy-info` - Update pregnancy info (protected)
- `PUT /api/users/location` - Update location (protected)
- `PUT /api/users/hospital` - Select hospital (protected)

### Symptoms
- `GET /api/symptoms` - Get symptoms (filter by month/week)
- `GET /api/symptoms/:id` - Get single symptom
- `POST /api/symptoms/check` - Check if symptom is normal

### Wellness
- `GET /api/wellness` - Get wellness recommendations
- `GET /api/wellness/:id` - Get single recommendation
- `GET /api/wellness/month/:month` - Get by month

### Consultants
- `GET /api/consultants` - Get all consultants
- `GET /api/consultants/:id` - Get single consultant
- `POST /api/consultants/register` - Register as consultant
- `PUT /api/consultants/:id` - Update consultant profile

### Chat
- `GET /api/chat` - Get all user chats
- `POST /api/chat` - Create new chat
- `GET /api/chat/:id/messages` - Get chat messages
- `POST /api/chat/:id/messages` - Send message
- `PUT /api/chat/:id/read` - Mark messages as read

### Hospitals
- `GET /api/hospitals` - Get hospitals
- `GET /api/hospitals/:id` - Get single hospital
- `POST /api/hospitals/nearby` - Find nearby hospitals

### AI
- `POST /api/ai/consultation` - Get AI consultation
- `POST /api/ai/symptom-analysis` - Analyze symptoms

### Search
- `GET /api/search` - Global search
- `GET /api/search/suggestions` - Get search suggestions

### Careers
- `GET /api/careers` - Get career opportunities
- `GET /api/careers/:id` - Get single career listing

## 🔒 Security Features

- **Helmet.js** - Security headers
- **Rate Limiting** - API rate limiting (100 requests per 15 minutes)
- **Input Validation** - Express-validator for all inputs
- **Password Hashing** - Bcrypt with salt rounds
- **JWT Tokens** - Secure authentication tokens
- **CORS** - Configured for frontend origin
- **MongoDB Injection Protection** - Via Mongoose

## 🗄️ Database Schema

### Models
- **User** - User accounts with pregnancy info
- **Consultant** - Healthcare professional profiles
- **Symptom** - Pregnancy symptoms database
- **Wellness** - Wellness recommendations
- **Hospital** - Maternity hospitals
- **Chat** - Chat conversations
- **Message** - Chat messages
- **Career** - Job listings

## 🚀 Production Deployment

1. Set `NODE_ENV=production` in environment
2. Update MongoDB connection string
3. Set strong JWT_SECRET
4. Configure FRONTEND_URL
5. Use process manager like PM2:

```bash
npm install -g pm2
pm2 start server.js --name mama-backend
pm2 save
pm2 startup
```

## 📊 Performance

- Optimized MongoDB indexes for fast queries
- Geospatial indexing for hospital location searches
- Text indexing for search functionality
- Connection pooling for database
- Compression middleware

## 🧪 Testing

Health check endpoint:
```bash
curl http://localhost:5000/health
```

## 📝 License

Proprietary - Mama Platform 2026

## 👥 Support

For issues or questions:
- Email: support@mama.com
- Documentation: https://docs.mama.com
