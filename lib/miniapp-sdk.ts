/**
 * Utility for working with Farcaster Mini App SDK
 * Checks SDK availability before use
 * SDK is available via window.miniappSdk when app is running in Farcaster
 */

declare global {
  interface Window {
    miniappSdk?: {
      actions: {
        ready: () => void;
        signIn: (options?: { nonce?: string }) => Promise<any>;
      };
      wallet?: {
        getEthereumProvider: () => Promise<any>;
      };
    };
  }
}

export function getMiniAppSDK() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const sdk = window.miniappSdk;
    return sdk || null;
  } catch {
    return null;
  }
}

export function isMiniApp(): boolean {
  return getMiniAppSDK() !== null;
}

