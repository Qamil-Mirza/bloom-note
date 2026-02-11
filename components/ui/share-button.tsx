'use client';

import { Button } from './button';
import { useShare } from '@/hooks/use-share';

interface ShareButtonProps {
  url: string;
  title?: string;
  text?: string;
}

export function ShareButton({
  url,
  title = 'Check out this Valentine card!',
  text = 'Someone made this beautiful 3D card for you! 💐',
}: ShareButtonProps) {
  const { share, copied } = useShare();

  const handleShare = () => {
    share(url, title, text);
  };

  return (
    <Button onClick={handleShare} variant="outline">
      {copied ? 'Copied!' : 'Share Card'}
    </Button>
  );
}
