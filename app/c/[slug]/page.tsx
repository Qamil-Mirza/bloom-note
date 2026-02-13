import { getCard } from '@/lib/cards/queries';
import { CardDisplay } from '@/components/card-viewer/card-display';
import { notFound } from 'next/navigation';

interface CardPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CardPageProps) {
  const { slug } = await params;
  const card = await getCard(slug);

  if (!card) {
    return { title: 'Card Not Found' };
  }

  return {
    title: `Valentine Gift - BloomNote`,
    description: card.message || 'A special 3D Valentine gift made for you!',
    openGraph: {
      title: `You received a Valentine gift! 💝`,
      description: 'Open to see your personalized 3D Valentine gift',
      images: ['/og-image.png'],
    },
  };
}

export default async function CardViewerPage({ params }: CardPageProps) {
  const { slug } = await params;
  const card = await getCard(slug);

  if (!card) {
    notFound();
  }

  return <CardDisplay card={card} />;
}
