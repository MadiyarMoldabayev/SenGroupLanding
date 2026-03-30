-- Run this in your Supabase SQL editor to add translation columns

ALTER TABLE articles ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS title_kk TEXT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS content_en TEXT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS content_kk TEXT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS excerpt_en TEXT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS excerpt_kk TEXT;
