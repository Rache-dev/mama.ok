# Render Deployment Guide

## Backend Deployment on Render

### Option 1: Using render.yaml (Recommended)

1. **Connect your GitHub repository to Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository: `Rache-dev/mama.ok`
   - Render will automatically detect `render.yaml`

2. **Set Environment Variables**
   In the Render dashboard, add these environment variables:
   
   ```
   MONGODB_URI=mongodb+srv://administratorK:Admin%40123@cluster0.fbifsdt.mongodb.net/mama?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=your_super_secret_jwt_key_change_in_production_2026_mama_platform
   FRONTEND_URL=https://mama-ok.vercel.app
   GROK_API_KEY=your_grok_api_key_here (optional)
   ```

3. **Deploy**
   - Click "Apply" to start deployment
   - Render will build and deploy your backend automatically

### Option 2: Manual Web Service Setup

If you prefer manual setup:

1. **Create New Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect to GitHub and select `Rache-dev/mama.ok`

2. **Configure Service**
   ```
   Name: mama-backend
   Region: Oregon (US West)
   Branch: main
   Root Directory: (leave empty or set to "backend")
   Runtime: Node
   Build Command: cd backend && npm install
   Start Command: cd backend && npm start
   ```

3. **Add Environment Variables** (same as above)

4. **Advanced Settings**
   ```
   Health Check Path: /health
   Auto-Deploy: Yes
   ```

5. **Create Web Service** - Click deploy!

### After Deployment

1. **Get your Backend URL**
   - Example: `https://mama-backend.onrender.com`

2. **Update Frontend Environment**
   - Go to Vercel dashboard
   - Add environment variable: `NEXT_PUBLIC_API_URL=https://mama-backend.onrender.com/api`
   - Redeploy frontend

3. **Update Backend CORS**
   - Ensure `FRONTEND_URL` environment variable is set correctly on Render
   - This allows your Vercel frontend to communicate with Render backend

### Verify Deployment

Test your backend API:
```bash
curl https://mama-backend.onrender.com/health
```

Expected response:
```json
{"status":"OK","message":"Server is running"}
```

### Free Tier Limitations

- Render free tier services **spin down after 15 minutes of inactivity**
- First request after spin-down may take 30-60 seconds
- Consider upgrading to a paid plan for production use

### Troubleshooting

**Build fails:**
- Check build logs in Render dashboard
- Verify all environment variables are set
- Ensure MongoDB connection string is URL-encoded

**Service crashes:**
- Check deployment logs
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check Node.js version compatibility

**CORS errors:**
- Verify `FRONTEND_URL` matches your Vercel URL exactly
- Include https:// in the URL

### Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Set to `production` | Yes |
| `PORT` | Server port (default: 5000) | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `JWT_EXPIRE` | JWT expiration time (e.g., 7d) | Yes |
| `FRONTEND_URL` | Vercel frontend URL | Yes |
| `GROK_API_KEY` | API key for Grok AI (optional) | No |

### Production Checklist

- [ ] MongoDB Atlas whitelist: 0.0.0.0/0
- [ ] Strong JWT_SECRET (change default!)
- [ ] FRONTEND_URL matches Vercel deployment
- [ ] Health check returns 200 OK
- [ ] Test API endpoints with Postman
- [ ] Monitor logs for errors
- [ ] Consider upgrading from free tier

### Cost Optimization

**Free Tier (Current):**
- $0/month
- Services spin down after inactivity
- 750 hours/month included

**Starter Plan ($7/month):**
- Always-on services (no spin down)
- Better for production use
- More reliable uptime

---

**Next Steps:** Once backend is deployed, update your Vercel frontend with the backend API URL!
