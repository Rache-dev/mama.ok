# Render Manual Configuration

If you created a Web Service manually (not using Blueprint), update these settings in your Render dashboard:

## Service Settings

**Basic Configuration:**
```
Name: mama-backend
Region: Oregon (US West)
Branch: main
Root Directory: backend
Runtime: Node
```

## Build & Start Commands

**Build Command:**
```bash
npm install
```

**Start Command:**
```bash
npm start
```

## Environment Variables

Add these in the Render dashboard under "Environment":

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://administratorK:Admin%40123@cluster0.fbifsdt.mongodb.net/mama?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_super_secret_jwt_key_change_in_production_2026_mama_platform
JWT_EXPIRE=7d
FRONTEND_URL=https://mama-ok.vercel.app
GROK_API_KEY=your_grok_api_key_here
```

## Advanced Settings

**Health Check Path:**
```
/health
```

**Auto-Deploy:**
```
✓ Enabled (Yes)
```

---

## Alternative: Use Blueprint

For easier setup, delete this service and use Blueprint instead:

1. **Delete current service**
2. Go to **New + → Blueprint**
3. Connect GitHub repo: `Rache-dev/mama.ok`
4. Render auto-detects `render.yaml` ✨
5. Add environment variables
6. Deploy!

This method is cleaner and uses infrastructure-as-code.
