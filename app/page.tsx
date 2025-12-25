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

  return (
    <>
      {!isInMiniApp && <Header />}
      <main style={{ padding: '2rem' }}>
        {/* Your content here */}
      </main>
    </>
  );
}

