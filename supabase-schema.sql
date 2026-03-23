-- Run this in your Supabase SQL editor to set up the blog tables

-- Articles table
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  excerpt TEXT NOT NULL DEFAULT '',
  cover_image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for faster slug lookups
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_published ON articles(published, created_at DESC);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Anyone can read published articles
CREATE POLICY "Published articles are viewable by everyone"
  ON articles FOR SELECT
  USING (published = true);

-- Authenticated users can do everything
CREATE POLICY "Authenticated users can manage articles"
  ON articles FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Storage bucket for article images (run separately if needed)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('article-images', 'article-images', true);
