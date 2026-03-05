export interface Profile {
  id: string;
  username: string;
  bio: string;
  avatar_url: string;
  created_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  featured_image: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  is_featured: boolean;
  view_count: number;
  profiles?: Profile;
  categories?: Category[];
}

export interface ArticleRevision {
  id: string;
  article_id: string;
  content: string;
  summary: string;
  edited_by: string;
  edit_comment: string;
  created_at: string;
  profiles?: Profile;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface TalkMessage {
  id: string;
  article_id: string;
  user_id: string;
  content: string;
  parent_id: string | null;
  created_at: string;
  profiles?: Profile;
  replies?: TalkMessage[];
}

export interface Media {
  id: string;
  filename: string;
  url: string;
  uploaded_by: string;
  created_at: string;
}
