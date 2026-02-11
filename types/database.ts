import type { CardConfig } from './card';

export interface Database {
  public: {
    Tables: {
      cards: {
        Row: {
          id: string;
          slug: string;
          config: CardConfig;
          message: string | null;
          created_at: string;
          views: number;
          last_viewed_at: string | null;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          slug: string;
          config: CardConfig;
          message?: string | null;
          created_at?: string;
          views?: number;
          last_viewed_at?: string | null;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          slug?: string;
          config?: CardConfig;
          message?: string | null;
          created_at?: string;
          views?: number;
          last_viewed_at?: string | null;
          deleted_at?: string | null;
        };
      };
    };
    Functions: {
      increment_card_views: {
        Args: {
          card_slug: string;
        };
        Returns: number;
      };
    };
  };
}
