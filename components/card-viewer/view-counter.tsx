'use client';

import { useEffect, useState } from 'react';

interface ViewCounterProps {
  slug: string;
  initialViews: number;
}

export function ViewCounter({ slug, initialViews }: ViewCounterProps) {
  const [views, setViews] = useState(initialViews);
  const [hasIncremented, setHasIncremented] = useState(false);

  useEffect(() => {
    if (hasIncremented) return;

    const incrementView = async () => {
      try {
        const response = await fetch(`/api/cards/${slug}/view`, {
          method: 'POST',
        });
        const data = await response.json();
        if (data.views) {
          setViews(data.views);
        }
      } catch (error) {
        console.error('Failed to increment view:', error);
      }
    };

    // Increment after a short delay (to avoid bots)
    const timeout = setTimeout(() => {
      incrementView();
      setHasIncremented(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [slug, hasIncremented]);

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
      <span>👁️</span>
      <span>{views} {views === 1 ? 'view' : 'views'}</span>
    </div>
  );
}
