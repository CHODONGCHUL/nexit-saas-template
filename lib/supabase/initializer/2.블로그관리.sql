-- ===== 포스트 테이블 =====
-- 블로그 포스트 테이블 생성
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  author_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  status TEXT CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
  featured_image TEXT,
  category TEXT DEFAULT '블로그',
  tags TEXT[] DEFAULT '{}',
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 포스트 테이블 RLS 활성화
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 공개된 포스트를 조회할 수 있음
CREATE POLICY "공개_포스트_조회_가능" 
  ON posts FOR SELECT 
  USING (status = 'published');

-- 작성자는 자신의 모든 포스트를 조회할 수 있음
CREATE POLICY "작성자_모든_포스트_조회_가능" 
  ON posts FOR SELECT 
  USING (auth.uid() = author_id);

-- 작성자는 자신의 포스트를 생성할 수 있음
CREATE POLICY "작성자_포스트_생성_가능" 
  ON posts FOR INSERT 
  WITH CHECK (auth.uid() = author_id);

-- 작성자는 자신의 포스트를 수정할 수 있음
CREATE POLICY "작성자_포스트_수정_가능" 
  ON posts FOR UPDATE 
  USING (auth.uid() = author_id);

-- 작성자는 자신의 포스트를 삭제할 수 있음
CREATE POLICY "작성자_포스트_삭제_가능" 
  ON posts FOR DELETE 
  USING (auth.uid() = author_id);

-- ===== 댓글 테이블 (현재 미구현) =====
-- 댓글 기능이 필요한 경우 아래 주석을 해제하여 사용하세요
/*
-- 댓글 테이블 생성
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES comments ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 댓글 테이블 RLS 활성화
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 공개된 포스트의 댓글을 조회할 수 있음
CREATE POLICY "공개_포스트_댓글_조회_가능" 
  ON comments FOR SELECT 
  USING (EXISTS(SELECT 1 FROM posts WHERE id = post_id AND status = 'published'));

-- 인증된 사용자만 댓글을 작성할 수 있음
CREATE POLICY "인증된_사용자_댓글_작성_가능" 
  ON comments FOR INSERT 
  WITH CHECK (auth.uid() = author_id);

-- 댓글 작성자만 자신의 댓글을 수정할 수 있음
CREATE POLICY "댓글_작성자_수정_가능" 
  ON comments FOR UPDATE 
  USING (auth.uid() = author_id);

-- 댓글 작성자만 자신의 댓글을 삭제할 수 있음
CREATE POLICY "댓글_작성자_삭제_가능" 
  ON comments FOR DELETE 
  USING (auth.uid() = author_id);
*/

-- ===== 스토리지 설정 =====
-- 블로그 이미지 저장을 위한 스토리지 버킷 생성
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

-- 블로그 이미지 공개 조회 가능
CREATE POLICY "블로그_이미지_공개_조회" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'blog-images');

-- 인증된 사용자만 블로그 이미지 업로드 가능
CREATE POLICY "블로그_이미지_업로드" 
  ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

-- 인증된 사용자만 블로그 이미지 수정 가능
CREATE POLICY "블로그_이미지_수정"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

-- 인증된 사용자만 블로그 이미지 삭제 가능
CREATE POLICY "블로그_이미지_삭제"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

-- ==============================================
-- 롤백 SQL (필요시 주석 해제 후 실행)
-- ==============================================

/*
-- 스토리지 정책 삭제
DROP POLICY IF EXISTS "블로그_이미지_삭제" ON storage.objects;
DROP POLICY IF EXISTS "블로그_이미지_수정" ON storage.objects;
DROP POLICY IF EXISTS "블로그_이미지_업로드" ON storage.objects;
DROP POLICY IF EXISTS "블로그_이미지_공개_조회" ON storage.objects;

-- 스토리지 버킷 삭제
DELETE FROM storage.buckets WHERE id = 'blog-images';

-- 댓글 정책 삭제 (댓글 기능을 활성화한 경우만)
-- DROP POLICY IF EXISTS "댓글_작성자_삭제_가능" ON comments;
-- DROP POLICY IF EXISTS "댓글_작성자_수정_가능" ON comments;
-- DROP POLICY IF EXISTS "인증된_사용자_댓글_작성_가능" ON comments;
-- DROP POLICY IF EXISTS "공개_포스트_댓글_조회_가능" ON comments;

-- 포스트 정책 삭제
DROP POLICY IF EXISTS "작성자_포스트_삭제_가능" ON posts;
DROP POLICY IF EXISTS "작성자_포스트_수정_가능" ON posts;
DROP POLICY IF EXISTS "작성자_포스트_생성_가능" ON posts;
DROP POLICY IF EXISTS "작성자_모든_포스트_조회_가능" ON posts;
DROP POLICY IF EXISTS "공개_포스트_조회_가능" ON posts;

-- 테이블 삭제
-- DROP TABLE IF EXISTS comments; -- 댓글 기능을 활성화한 경우만
DROP TABLE IF EXISTS posts;
*/ 