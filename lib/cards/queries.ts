import { getSupabaseServerClient } from '@/lib/supabase/server';
import { generateSlug } from './slug';
import type { Card, CardConfig } from '@/types/card';

/**
 * Create a new card in the database
 */
export async function createCard(
  config: CardConfig,
  message: string
): Promise<{ slug: string; id: string }> {
  const supabase = await getSupabaseServerClient();
  const slug = generateSlug();

  const { data, error } = await supabase
    .from('cards')
    .insert({
      slug,
      config,
      message,
    })
    .select('id, slug')
    .single();

  if (error) {
    throw new Error('Failed to create card');
  }

  return data;
}

/**
 * Get a card by slug
 */
export async function getCard(slug: string): Promise<Card | null> {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .eq('slug', slug)
    .is('deleted_at', null)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      return null;
    }
    throw new Error('Failed to get card');
  }

  return data as Card;
}

/**
 * Increment view counter for a card
 */
export async function incrementViews(slug: string): Promise<number> {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase.rpc('increment_card_views', {
    card_slug: slug,
  });

  if (error) {
    return 0;
  }

  return data || 0;
}
