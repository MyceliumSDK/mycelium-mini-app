import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';


export const metadata: Metadata = {
  title: 'Mycelium Mini App',
  description: 'Farcaster Mini App with Privy & Base',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;


  // Validate App ID (must be non-empty and not a placeholder)
  const isValidAppId = privyAppId && 
    privyAppId.trim() !== '' && 
    privyAppId !== 'your_privy_app_id_here' &&
    privyAppId.length > 10; // Minimum length for valid App ID

  if (!isValidAppId) {
    return (
      <html lang="en">
        <body>
          <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Configuration Error</h1>
            <p style={{ color: 'red', marginTop: '1rem' }}>
              <strong>NEXT_PUBLIC_PRIVY_APP_ID</strong> is not set or invalid.
            </p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
              Current value: <code>{process.env.NEXT_PUBLIC_PRIVY_APP_ID}</code>
            </p>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="694d4b1fc63ad876c9081308" />
      </head>
      <body>
        <Providers privyAppId={privyAppId}>{children}</Providers>
      </body>
    </html>
  );
}