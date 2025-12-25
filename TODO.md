# TODO

Questions, thoughts, and solutions for Mycelium Mini App project.

## Questions

- [ ] Can I have a best wallets without/before login?
- [ ] How to handle Telegram Mini App integration?

## Thoughts

- Auto-login in Mini Apps (Farcaster/Telegram) - user is already authenticated
- Header with login button only shown in Web mode
- Need to study @mycelium-sdk/core documentation for proper integration

## Solutions

- [x] Implemented automatic login for Mini Apps
- [x] Created header component that only shows in Web mode
- [x] Translated all comments and content to English
- [x] Fixed signIn to pass nonce parameter
- [x] Updated SDK TypeScript types
- [x] Completed manifest with all required fields
- [ ] Integrate Mycelium SDK for yield generation
- [ ] Add error handling for SDK initialization
- [ ] Implement wallet connection flow

## Testing Guide

### Local Testing Setup

1. **Install cloudflared** (if not installed):
   ```bash
   brew install cloudflared
   # Or download from https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/
   ```

2. **Start local dev server**:
   ```bash
   npm run dev
   ```

3. **Create tunnel**:
   ```bash
   cloudflared tunnel --url http://localhost:3000
   ```

4. **Copy the HTTPS URL** (e.g., `https://xxxxx.trycloudflare.com`)

5. **Update manifest temporarily**:
   - Edit `public/.well-known/farcaster.json`
   - Replace `https://yourdomain.com` with your cloudflared URL
   - Update all image URLs to use the tunnel URL

6. **Test your app**:
   - Go to https://base.dev/preview
   - Paste your cloudflared URL
   - Click "Launch" to test
   - Or use https://farcaster.xyz/~/developers/mini-apps/embed

### Privy Dashboard Configuration

**Required before testing**:

1. Go to [Privy Dashboard](https://dashboard.privy.io/)
2. Select your app
3. Navigate to **Configuration → App settings → Domains**
4. Add domains:
   - Your deployment URL (e.g., `https://your-app.vercel.app`)
   - **Critical**: `https://farcaster.xyz` (required for iframe-in-iframe)
   - Your cloudflared URL for testing (e.g., `https://xxxxx.trycloudflare.com`)
5. Go to **User management → Authentication → Socials**
6. Ensure **Farcaster** is enabled

### Production Deployment

1. Deploy to Vercel (or your hosting)
2. Update manifest URLs to production domain
3. Add production domain to Privy Dashboard
4. Test at https://base.dev/preview
5. Publish by creating a post in Base app with your app URL

## Notes

- Privy handles authentication for both Mini App and Web modes
- Farcaster Mini App SDK available via `window.miniappSdk`
- Base network configured via Wagmi
- Manifest must be publicly accessible at `/.well-known/farcaster.json`
- Account association (Base docs step 4-5) is optional for initial testing

