import { NextResponse } from 'next/server';
import { incrementViews } from '@/lib/cards/queries';

const SLUG_REGEX = /^[A-Za-z0-9_-]{6,20}$/;

export async function POST(
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

    const views = await incrementViews(slug);
    return NextResponse.json({ views });
  } catch (error) {
    // Fail silently (view counting is non-critical)
    return NextResponse.json({ views: 0 });
  }
}
