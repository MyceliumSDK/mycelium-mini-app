# Mycelium Mini App

Farcaster Mini App + Web App with unified codebase, authentication via Privy (Farcaster) and onchain interactions on Base.

## Architecture

- **Single Next.js app** that works as:
  - Mini App inside Farcaster
  - Regular Web application
- **Privy** — single source of truth for auth
- **Farcaster Mini App SDK** — availability checked before use
- **Wagmi + Viem** — for Base network interactions

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file based on `.env.local.example`:
```bash
cp .env.local.example .env.local
```

3. Get `NEXT_PUBLIC_PRIVY_APP_ID`:
   - Register on [Privy Dashboard](https://dashboard.privy.io/)
   - Create a new application
   - Enable Farcaster login method in **User management → Authentication → Socials**
   - Go to **Configuration → App settings → Domains** and add:
     - Your deployment URL (e.g., `https://your-app.vercel.app`)
     - **Critical**: `https://farcaster.xyz` (required for iframe-in-iframe)
     - For local testing: your cloudflared tunnel URL
   - Copy App ID to `.env.local`

4. Start dev server:
```bash
npm run dev
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout (server component)
│   ├── providers.tsx        # Client providers (Privy, Wagmi, React Query)
│   ├── page.tsx            # Main page with auth flows
│   └── globals.css         # Global styles
├── lib/
│   ├── miniapp-sdk.ts      # Utilities for Farcaster Mini App SDK
│   └── wagmi-config.ts     # Wagmi configuration for Base
├── .well-known/
│   └── farcaster.json      # Mini App manifest
└── package.json
```

## Auth Flows

### Mini App Flow
1. Check `window.miniappSdk` availability
2. Call `sdk.actions.ready()` on load
3. On login: `sdk.actions.signIn()` → `loginToMiniApp()` (Privy)

### Web App Flow
1. Standard Privy `login()` with Farcaster method

## Base Network

Wagmi configured with Base network. Use `useConnect` hook to connect wallet.

## Mini App Manifest

The `/.well-known/farcaster.json` file must be accessible on your domain. Update URLs in the manifest before deployment.

## Testing

For local Mini App testing use `cloudflared`:
```bash
cloudflared tunnel --url http://localhost:3000
```

Use the obtained public URL in the manifest.

## Deployment

### Quick Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy via Vercel Dashboard**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Import your GitHub repository
   - Add environment variable: `NEXT_PUBLIC_PRIVY_APP_ID`
   - Deploy

3. **Configure Privy Dashboard**:
   - Add your Vercel URL to allowed domains
   - Ensure `https://farcaster.xyz` is also added

4. **Verify manifest**:
   - Check: `https://your-app.vercel.app/.well-known/farcaster.json`
   - Test at: `https://base.dev/preview`

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).
