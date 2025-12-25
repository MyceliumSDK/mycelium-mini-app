# Deployment Guide - Vercel

Step-by-step guide to deploy Mycelium Mini App to Vercel.

## Prerequisites

- Vercel account (sign up at https://vercel.com)
- GitHub repository with your code
- Privy App ID configured

## Step 1: Prepare Your Repository

1. **Commit all changes**:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Verify manifest URLs**:
   - Check `public/.well-known/farcaster.json`
   - All URLs should point to your production domain (e.g., `https://mycelium.sh`)

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
5. Click **"Deploy"**

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   - Follow prompts to link project
   - For production: `vercel --prod`

## Step 3: Configure Environment Variables

1. In Vercel Dashboard, go to your project
2. Navigate to **Settings** → **Environment Variables**
3. Add:
   - `NEXT_PUBLIC_PRIVY_APP_ID` = your Privy App ID
4. Click **"Save"**
5. **Redeploy** to apply changes (Settings → Deployments → Redeploy)

## Step 4: Update Privy Dashboard

1. Go to [Privy Dashboard](https://dashboard.privy.io/)
2. Select your app
3. Navigate to **Configuration** → **App settings** → **Domains**
4. Add your Vercel deployment URL:
   - Production: `https://your-app.vercel.app` (or your custom domain)
   - **Critical**: Ensure `https://farcaster.xyz` is also added
5. Save changes

## Step 5: Verify Manifest Accessibility

After deployment, verify your manifest is accessible:

```bash
curl https://your-app.vercel.app/.well-known/farcaster.json
```

Or visit in browser: `https://your-app.vercel.app/.well-known/farcaster.json`

## Step 6: Test Your Deployment

1. **Test manifest**:
   - Visit: `https://base.dev/preview`
   - Paste your app URL
   - Verify manifest loads correctly

2. **Test Mini App**:
   - Use Farcaster embed tool: `https://farcaster.xyz/~/developers/mini-apps/embed`
   - Launch your app and test authentication

## Step 7: Custom Domain (Optional)

1. In Vercel Dashboard → **Settings** → **Domains**
2. Add your custom domain (e.g., `mycelium.sh`)
3. Follow DNS configuration instructions
4. Update manifest URLs after domain is active
5. Redeploy if needed

## Important Notes

- **Manifest must be publicly accessible** - Vercel automatically serves files from `public/` directory
- **Environment variables** are required for build - add them before first deployment
- **Privy domains** must include both your app URL and `https://farcaster.xyz`
- **HTTPS is required** - Vercel provides it automatically
- **Redeploy after** changing environment variables or Privy settings

## Troubleshooting

### Manifest not accessible
- Check that file exists in `public/.well-known/farcaster.json`
- Verify file is committed to repository
- Check Vercel build logs for errors

### Authentication fails
- Verify `NEXT_PUBLIC_PRIVY_APP_ID` is set in Vercel
- Check Privy Dashboard domains include your Vercel URL
- Ensure `https://farcaster.xyz` is in allowed domains

### Build fails
- Check build logs in Vercel Dashboard
- Verify all dependencies are in `package.json`
- Ensure TypeScript errors are resolved

