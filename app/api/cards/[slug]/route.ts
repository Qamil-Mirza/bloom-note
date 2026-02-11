import { NextResponse } from 'next/server';
import { getCard } from '@/lib/cards/queries';

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const card = await getCard(slug);

    if (!card) {
      return NextResponse.json(
        { error: 'Card not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(card);
  } catch (error) {
    console.error('Card fetch failed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch card' },
      { status: 500 }
    );
  }
}
