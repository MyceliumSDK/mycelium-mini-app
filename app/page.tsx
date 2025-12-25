'use client';

import { useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useLoginToMiniApp } from '@privy-io/react-auth/farcaster';
import { getMiniAppSDK, isMiniApp } from '@/lib/miniapp-sdk';

function Header() {
  const { authenticated, login, logout } = usePrivy();

  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1>Mycelium</h1>
      {authenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </header>
  );
}

function Dashboard() {
  const { user } = usePrivy();
  const isInMiniApp = isMiniApp();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Welcome to Mycelium</h2>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          Generate yield with Mycelium SDK on Base network
        </p>
        {isInMiniApp && (
          <p style={{ color: '#4CAF50', fontSize: '0.9rem', marginBottom: '1rem' }}>
            ✓ Running in Farcaster Mini App
          </p>
        )}
      </div>

      {user && (
        <div style={{ 
          padding: '1.5rem', 
          backgroundColor: '#f5f5f5', 
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>User Info</h3>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>
            {user.farcaster?.username && (
              <p><strong>Farcaster:</strong> @{user.farcaster.username}</p>
            )}
            {user.farcaster?.fid && (
              <p><strong>FID:</strong> {user.farcaster.fid}</p>
            )}
            {user.wallet?.address && (
              <p><strong>Wallet:</strong> {user.wallet.address.slice(0, 6)}...{user.wallet.address.slice(-4)}</p>
            )}
          </div>
        </div>
      )}

      <div style={{ 
        padding: '1.5rem', 
        backgroundColor: '#fff', 
        border: '1px solid #e0e0e0',
        borderRadius: '8px'
      }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Yield Generation</h3>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          Connect your wallet to start generating yield with Mycelium SDK.
        </p>
        <button 
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500'
          }}
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
}

function LoginPrompt() {
  const { login } = usePrivy();

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      textAlign: 'center',
      padding: '3rem 2rem'
    }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Welcome to Mycelium</h2>
      <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1.1rem' }}>
        Generate yield with Mycelium SDK on Base network
      </p>
      <button
        onClick={login}
        style={{
          padding: '1rem 2rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '1.1rem',
          fontWeight: '600'
        }}
      >
        Login with Farcaster
      </button>
    </div>
  );
}

export default function Home() {
  const { ready, authenticated } = usePrivy();
  const { initLoginToMiniApp, loginToMiniApp } = useLoginToMiniApp();

  useEffect(() => {
    const miniapp = isMiniApp();
    
    if (miniapp) {
      const sdk = getMiniAppSDK();
      if (sdk) {
        sdk.actions.ready();
      }
    }
  }, []);

  useEffect(() => {
    if (!ready || authenticated) return;

    const miniapp = isMiniApp();
    if (!miniapp) return;

    const handleAutoLogin = async () => {
      const sdk = getMiniAppSDK();
      if (!sdk) return;

      try {
        const { nonce } = await initLoginToMiniApp();
        const credential = await sdk.actions.signIn({ nonce });
        if (credential?.message && credential?.signature) {
          await loginToMiniApp({
            message: credential.message,
            signature: credential.signature,
          });
        }
      } catch (error) {
        console.error('Auto login error:', error);
      }
    };

    handleAutoLogin();
  }, [ready, authenticated, initLoginToMiniApp, loginToMiniApp]);

  if (!ready) {
    return null;
  }

  const isInMiniApp = isMiniApp();
  // Show dashboard if authenticated OR if in Mini App (auto-login will happen)
  const shouldShowDashboard = authenticated || isInMiniApp;

  return (
    <>
      {!isInMiniApp && <Header />}
      <main style={{ padding: '2rem', minHeight: 'calc(100vh - 80px)' }}>
        {shouldShowDashboard ? <Dashboard /> : <LoginPrompt />}
      </main>
    </>
  );
}

