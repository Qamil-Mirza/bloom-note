import { NextResponse } from 'next/server';
import { getCard } from '@/lib/cards/queries';

const SLUG_REGEX = /^[A-Za-z0-9_-]{6,20}$/;

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    if (!SLUG_REGEX.test(slug)) {
      return NextResponse.json(
        { error: 'Invalid slug format' },
        { status: 400 }
      );
    }

    const card = await getCard(slug);

    if (!card) {
      return NextResponse.json(
        { error: 'Card not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(card);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch card' },
      { status: 500 }
    );
  }
}
