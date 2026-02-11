import { NextResponse } from 'next/server';
import { incrementViews } from '@/lib/cards/queries';

export async function POST(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const views = await incrementViews(slug);
    return NextResponse.json({ views });
  } catch (error) {
    // Fail silently (view counting is non-critical)
    console.error('View increment failed:', error);
    return NextResponse.json({ views: 0 });
  }
}
