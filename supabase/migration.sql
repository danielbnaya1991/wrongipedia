-- Wrongipedia Database Schema
-- Run this in the Supabase SQL Editor

-- Enable required extensions
create extension if not exists "uuid-ossp";

-- 1. Profiles
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  bio text default '',
  avatar_url text default '',
  created_at timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone" on public.profiles
  for select using (true);

create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Users can insert their own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Articles
create table public.articles (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  content text default '',
  summary text default '',
  featured_image text default '',
  created_by uuid references public.profiles(id),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  is_featured boolean default false,
  view_count integer default 0
);

alter table public.articles enable row level security;

create policy "Articles are viewable by everyone" on public.articles
  for select using (true);

create policy "Authenticated users can create articles" on public.articles
  for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update articles" on public.articles
  for update using (auth.role() = 'authenticated');

-- Full-text search index
alter table public.articles add column fts tsvector
  generated always as (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(content, ''))) stored;

create index articles_fts_idx on public.articles using gin(fts);
create index articles_slug_idx on public.articles(slug);

-- 3. Article Revisions
create table public.article_revisions (
  id uuid default uuid_generate_v4() primary key,
  article_id uuid references public.articles(id) on delete cascade not null,
  content text not null,
  summary text default '',
  edited_by uuid references public.profiles(id),
  edit_comment text default '',
  created_at timestamptz default now() not null
);

alter table public.article_revisions enable row level security;

create policy "Revisions are viewable by everyone" on public.article_revisions
  for select using (true);

create policy "Authenticated users can create revisions" on public.article_revisions
  for insert with check (auth.role() = 'authenticated');

-- 4. Categories
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text unique not null,
  slug text unique not null,
  description text default ''
);

alter table public.categories enable row level security;

create policy "Categories are viewable by everyone" on public.categories
  for select using (true);

create policy "Authenticated users can create categories" on public.categories
  for insert with check (auth.role() = 'authenticated');

-- 5. Article Categories (junction)
create table public.article_categories (
  article_id uuid references public.articles(id) on delete cascade,
  category_id uuid references public.categories(id) on delete cascade,
  primary key (article_id, category_id)
);

alter table public.article_categories enable row level security;

create policy "Article categories are viewable by everyone" on public.article_categories
  for select using (true);

create policy "Authenticated users can manage article categories" on public.article_categories
  for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can delete article categories" on public.article_categories
  for delete using (auth.role() = 'authenticated');

-- 6. Talk Messages
create table public.talk_messages (
  id uuid default uuid_generate_v4() primary key,
  article_id uuid references public.articles(id) on delete cascade not null,
  user_id uuid references public.profiles(id) not null,
  content text not null,
  parent_id uuid references public.talk_messages(id) on delete cascade,
  created_at timestamptz default now() not null
);

alter table public.talk_messages enable row level security;

create policy "Talk messages are viewable by everyone" on public.talk_messages
  for select using (true);

create policy "Authenticated users can create talk messages" on public.talk_messages
  for insert with check (auth.uid() = user_id);

-- 7. Media
create table public.media (
  id uuid default uuid_generate_v4() primary key,
  filename text not null,
  url text not null,
  uploaded_by uuid references public.profiles(id),
  created_at timestamptz default now() not null
);

alter table public.media enable row level security;

create policy "Media is viewable by everyone" on public.media
  for select using (true);

create policy "Authenticated users can upload media" on public.media
  for insert with check (auth.role() = 'authenticated');

-- Create storage bucket for media
insert into storage.buckets (id, name, public) values ('media', 'media', true);

create policy "Anyone can view media" on storage.objects
  for select using (bucket_id = 'media');

create policy "Authenticated users can upload media" on storage.objects
  for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');

-- Function to increment view count
create or replace function public.increment_view_count(article_slug text)
returns void as $$
begin
  update public.articles set view_count = view_count + 1 where slug = article_slug;
end;
$$ language plpgsql security definer;
