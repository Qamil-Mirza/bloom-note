-- Cards table: stores all card configurations
create table cards (
  -- Primary key
  id uuid default gen_random_uuid() primary key,

  -- Unique shareable slug (10 chars, URL-safe)
  slug text unique not null,

  -- Card configuration (JSONB for flexibility)
  config jsonb not null default '{}'::jsonb,

  -- Denormalized message for easy querying/moderation
  message text,

  -- Timestamps
  created_at timestamptz default now() not null,
  views integer default 0 not null,
  last_viewed_at timestamptz,

  -- Soft delete (for moderation/cleanup)
  deleted_at timestamptz
);

-- Indexes
create index idx_cards_slug
  on cards(slug)
  where deleted_at is null;

create index idx_cards_created_at
  on cards(created_at desc)
  where deleted_at is null;

-- GIN index for JSONB queries (analytics)
create index idx_cards_config
  on cards using gin(config);

-- Row Level Security (RLS)
alter table cards enable row level security;

-- Public read access for non-deleted cards
create policy "Public can read cards"
  on cards for select
  using (deleted_at is null);

-- Function to increment view counter
create or replace function increment_card_views(card_slug text)
returns integer as $$
declare
  new_views integer;
begin
  update cards
  set
    views = views + 1,
    last_viewed_at = now()
  where slug = card_slug and deleted_at is null
  returning views into new_views;

  return new_views;
end;
$$ language plpgsql security definer;

-- Grant execute permission to anon users
grant execute on function increment_card_views(text) to anon;
