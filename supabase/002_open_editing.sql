-- Phase 1: Open Editing Migration
-- Allows anonymous editing of articles, seed article promotion, and spam protection

-- 1. Make edited_by nullable for anonymous edits
ALTER TABLE public.article_revisions ALTER COLUMN edited_by DROP NOT NULL;

-- 2. Add editor_ip for anonymous tracking
ALTER TABLE public.article_revisions ADD COLUMN IF NOT EXISTS editor_ip inet;

-- 3. Add is_minor flag
ALTER TABLE public.article_revisions ADD COLUMN IF NOT EXISTS is_minor boolean DEFAULT false;

-- 4. Add promoted_from_seed flag to articles
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS promoted_from_seed boolean DEFAULT false;

-- 5. Make created_by nullable for anonymous article creation
ALTER TABLE public.articles ALTER COLUMN created_by DROP NOT NULL;

-- 6. Update RLS policies to allow anonymous inserts/updates

-- Articles: allow anonymous inserts
DROP POLICY IF EXISTS "Authenticated users can create articles" ON public.articles;
CREATE POLICY "Anyone can create articles" ON public.articles
  FOR INSERT WITH CHECK (true);

-- Articles: allow anonymous updates
DROP POLICY IF EXISTS "Authenticated users can update articles" ON public.articles;
CREATE POLICY "Anyone can update articles" ON public.articles
  FOR UPDATE USING (true);

-- Revisions: allow anonymous inserts
DROP POLICY IF EXISTS "Authenticated users can create revisions" ON public.article_revisions;
CREATE POLICY "Anyone can create revisions" ON public.article_revisions
  FOR INSERT WITH CHECK (true);

-- Article categories: allow anonymous inserts
DROP POLICY IF EXISTS "Authenticated users can manage article categories" ON public.article_categories;
CREATE POLICY "Anyone can manage article categories" ON public.article_categories
  FOR INSERT WITH CHECK (true);

-- Categories: allow anonymous inserts (for seed promotion)
DROP POLICY IF EXISTS "Authenticated users can create categories" ON public.categories;
CREATE POLICY "Anyone can create categories" ON public.categories
  FOR INSERT WITH CHECK (true);

-- 7. Rate limiting table for spam protection
CREATE TABLE IF NOT EXISTS public.edit_rate_limits (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  editor_ip inet NOT NULL,
  article_id uuid REFERENCES public.articles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.edit_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Rate limits are insertable by anyone" ON public.edit_rate_limits
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Rate limits are viewable by anyone" ON public.edit_rate_limits
  FOR SELECT USING (true);

-- Index for efficient rate limit queries
CREATE INDEX IF NOT EXISTS edit_rate_limits_ip_time_idx
  ON public.edit_rate_limits(editor_ip, created_at);

-- Cleanup old rate limit entries (older than 1 hour)
CREATE OR REPLACE FUNCTION public.cleanup_rate_limits()
RETURNS void AS $$
BEGIN
  DELETE FROM public.edit_rate_limits WHERE created_at < now() - interval '1 hour';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
