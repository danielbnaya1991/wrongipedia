-- Phase 4: Wiki Culture Migration

-- 1. Userboxes
CREATE TABLE IF NOT EXISTS public.userboxes (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  label text NOT NULL,
  value text NOT NULL,
  bg_color text DEFAULT '#eef',
  border_color text DEFAULT '#99b',
  icon text DEFAULT '',
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.userboxes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Userboxes are viewable by everyone" ON public.userboxes
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create userboxes" ON public.userboxes
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 2. User-userbox junction
CREATE TABLE IF NOT EXISTS public.user_userboxes (
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  userbox_id uuid REFERENCES public.userboxes(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, userbox_id)
);

ALTER TABLE public.user_userboxes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User userboxes are viewable by everyone" ON public.user_userboxes
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own userboxes" ON public.user_userboxes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own userboxes" ON public.user_userboxes
  FOR DELETE USING (auth.uid() = user_id);

-- 3. Barnstars
CREATE TABLE IF NOT EXISTS public.barnstars (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  from_user uuid REFERENCES public.profiles(id) NOT NULL,
  to_user uuid REFERENCES public.profiles(id) NOT NULL,
  type text NOT NULL DEFAULT 'original', -- 'original', 'tireless', 'anti-vandalism', 'writers', 'brilliant-prose'
  message text DEFAULT '',
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.barnstars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Barnstars are viewable by everyone" ON public.barnstars
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can award barnstars" ON public.barnstars
  FOR INSERT WITH CHECK (auth.uid() = from_user);

-- 4. Featured article nominations
CREATE TABLE IF NOT EXISTS public.featured_nominations (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  article_id uuid REFERENCES public.articles(id) ON DELETE CASCADE NOT NULL,
  nominated_by uuid REFERENCES public.profiles(id) NOT NULL,
  status text DEFAULT 'open', -- 'open', 'promoted', 'rejected'
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.featured_nominations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Nominations are viewable by everyone" ON public.featured_nominations
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can nominate" ON public.featured_nominations
  FOR INSERT WITH CHECK (auth.uid() = nominated_by);

CREATE POLICY "Admins can update nominations" ON public.featured_nominations
  FOR UPDATE USING (true);

-- 5. Featured article votes
CREATE TABLE IF NOT EXISTS public.featured_votes (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  nomination_id uuid REFERENCES public.featured_nominations(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.profiles(id) NOT NULL,
  vote text NOT NULL, -- 'support', 'oppose', 'neutral'
  comment text DEFAULT '',
  created_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(nomination_id, user_id)
);

ALTER TABLE public.featured_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Votes are viewable by everyone" ON public.featured_votes
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can vote" ON public.featured_votes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Seed default userboxes
INSERT INTO public.userboxes (slug, label, value, bg_color, border_color, icon) VALUES
  ('wrong-level-1', 'WRONG-1', 'This user has basic wrongness skills.', '#fee', '#c99', ''),
  ('wrong-level-2', 'WRONG-2', 'This user has intermediate wrongness skills.', '#ffe', '#cc9', ''),
  ('wrong-level-3', 'WRONG-3', 'This user is an expert at being wrong.', '#efe', '#9c9', ''),
  ('wrong-level-n', 'WRONG-N', 'This user is a native wrong-speaker.', '#eef', '#99c', ''),
  ('anti-facts', 'ANTI', 'This user is firmly anti-factual.', '#fef', '#c9c', ''),
  ('wrong-editor', 'WE', 'This user is a Wrongipedia editor.', '#eee', '#999', ''),
  ('bot-user', 'BOT', 'This user account is a bot.', '#ddf', '#88b', ''),
  ('admin-user', 'ADMIN', 'This user is a Wrongipedia administrator.', '#ffd', '#cc8', '')
ON CONFLICT (slug) DO NOTHING;
