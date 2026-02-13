import { NextResponse } from 'next/server';
import { createCard } from '@/lib/cards/queries';
import { CardConfigSchema } from '@/lib/cards/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate config with Zod
    const result = CardConfigSchema.safeParse(body.config);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid card config', details: result.error },
        { status: 400 }
      );
    }

    // Create card in database
    const card = await createCard(result.data, result.data.message.text);

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    return NextResponse.json({
      slug: card.slug,
      url: `${appUrl}/c/${card.slug}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create card' },
      { status: 500 }
    );
  }
}
