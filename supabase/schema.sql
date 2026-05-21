-- MR7 Unisex Fitness — Admin Panel Schema
-- Run this in your Supabase SQL editor

-- Pricing Plans
create table if not exists pricing_plans (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  price text not null,
  period text not null default '/month',
  features text[] not null default '{}',
  is_popular boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- Gallery Items (images + videos)
create table if not exists gallery_items (
  id uuid default gen_random_uuid() primary key,
  url text not null,
  type text not null check (type in ('image', 'video')),
  cloudinary_public_id text not null default '',
  alt text not null default '',
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- Story Videos (Instagram reel-style cards)
create table if not exists story_videos (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  thumbnail_url text not null,
  video_url text not null,
  cloudinary_public_id text not null default '',
  sort_order int not null default 0,
  created_at timestamptz default now()
);

-- Section visibility settings
create table if not exists section_settings (
  key text primary key,
  enabled boolean not null default true,
  updated_at timestamptz default now()
);

alter table section_settings enable row level security;

create policy "Public can read section_settings"
  on section_settings for select using (true);

create policy "Authenticated can manage section_settings"
  on section_settings for all using (auth.role() = 'authenticated');

-- Instructors
create table if not exists instructors (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  specialty text not null default '',
  summary text not null default '',
  photo_url text not null default '',
  cloudinary_public_id text not null default '',
  sort_order int not null default 0,
  created_at timestamptz default now()
);

alter table instructors enable row level security;

create policy "Public can read instructors"
  on instructors for select using (true);

create policy "Authenticated can manage instructors"
  on instructors for all using (auth.role() = 'authenticated');

-- Enable Row Level Security
alter table pricing_plans enable row level security;
alter table gallery_items enable row level security;
alter table story_videos enable row level security;

-- Public read policies
create policy "Public can read pricing_plans"
  on pricing_plans for select using (true);

create policy "Public can read gallery_items"
  on gallery_items for select using (true);

create policy "Public can read story_videos"
  on story_videos for select using (true);

-- Authenticated write policies (admin only via service role key in API routes)
create policy "Authenticated can manage pricing_plans"
  on pricing_plans for all using (auth.role() = 'authenticated');

create policy "Authenticated can manage gallery_items"
  on gallery_items for all using (auth.role() = 'authenticated');

create policy "Authenticated can manage story_videos"
  on story_videos for all using (auth.role() = 'authenticated');
