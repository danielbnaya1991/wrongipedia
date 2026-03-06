-- Phase 3: Community Infrastructure Migration

-- 1. Watchlist table
CREATE TABLE IF NOT EXISTS public.watchlist (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  article_id uuid REFERENCES public.articles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id, article_id)
);

ALTER TABLE public.watchlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own watchlist" ON public.watchlist
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own watchlist" ON public.watchlist
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from their own watchlist" ON public.watchlist
  FOR DELETE USING (auth.uid() = user_id);

-- 2. Notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL DEFAULT 'edit', -- 'edit', 'talk', 'mention', 'system'
  message text NOT NULL,
  link text,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can create notifications" ON public.notifications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS notifications_user_read_idx
  ON public.notifications(user_id, is_read, created_at);

-- 3. User talk messages table
CREATE TABLE IF NOT EXISTS public.user_talk_messages (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  target_user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  author_id uuid REFERENCES public.profiles(id),
  author_ip inet,
  content text NOT NULL,
  parent_id uuid REFERENCES public.user_talk_messages(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.user_talk_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User talk messages are viewable by everyone" ON public.user_talk_messages
  FOR SELECT USING (true);

CREATE POLICY "Anyone can create user talk messages" ON public.user_talk_messages
  FOR INSERT WITH CHECK (true);

-- 4. User blocks table
CREATE TABLE IF NOT EXISTS public.user_blocks (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  blocked_user_id uuid REFERENCES public.profiles(id),
  blocked_ip inet,
  blocked_by uuid REFERENCES public.profiles(id) NOT NULL,
  reason text DEFAULT '',
  expires_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.user_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blocks are viewable by admins" ON public.user_blocks
  FOR SELECT USING (true);

CREATE POLICY "Admins can create blocks" ON public.user_blocks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can delete blocks" ON public.user_blocks
  FOR DELETE USING (true);

-- 5. User preferences table
CREATE TABLE IF NOT EXISTS public.user_preferences (
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  email_notifications boolean DEFAULT true,
  watchlist_notifications boolean DEFAULT true,
  skin text DEFAULT 'vector-2022',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own preferences" ON public.user_preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own preferences" ON public.user_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences" ON public.user_preferences
  FOR UPDATE USING (auth.uid() = user_id);

-- 6. Add role column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role text DEFAULT 'user';

-- 7. Add protection_level to articles
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS protection_level text DEFAULT 'none';
