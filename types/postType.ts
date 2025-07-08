export interface Post {
  id: string;
  title: string;
  content: any; // TipTap JSON content
  slug: string;
  excerpt?: string;
  author_id: string;
  status: "draft" | "published";
  featured_image?: string;
  category: string;
  tags: string[];
  published_at?: string;
  created_at: string;
  updated_at: string;

  // 관계형 데이터
  author?: {
    id: string;
    username?: string;
    name?: string;
    avatar_url?: string;
  };
  comments?: Comment[];
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  parent_id?: string;
  created_at: string;
  updated_at: string;

  // 관계형 데이터
  author?: {
    id: string;
    username?: string;
    name?: string;
    avatar_url?: string;
  };
  replies?: Comment[];
}

export interface CreatePostRequest {
  title: string;
  content: any;
  slug: string;
  excerpt?: string;
  status: "draft" | "published";
  featured_image?: string;
  category?: string;
  tags?: string[];
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {
  id: string;
}

export interface CreateCommentRequest {
  post_id: string;
  content: string;
  parent_id?: string;
}

export interface PostListParams {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  search?: string;
  status?: "draft" | "published";
  author_id?: string;
}

export interface PostListResponse {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
