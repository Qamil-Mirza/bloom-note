'use client';

import { useState, useRef, useEffect } from 'react';

export function useShare() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const share = async (url: string, title: string, text: string) => {
    // Try Web Share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return true;
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          // User cancelled, not an error
          return false;
        }
        // Fall back to clipboard
      }
    }

    // Fallback to clipboard copy
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (error) {
      return false;
    }
  };

  return { share, copied };
}
