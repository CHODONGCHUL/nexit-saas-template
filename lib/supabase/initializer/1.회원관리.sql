-- public 스키마에 사용자 프로필 테이블 생성
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  username TEXT,
  name TEXT,
  email TEXT UNIQUE,
  avatar_url TEXT,
  role TEXT,
  customer_id TEXT UNIQUE,
  subscription JSONB,
  marketing_consent BOOLEAN DEFAULT false,
  marketing_consent_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 행 수준 보안(RLS) 활성화
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS 정책: 모든 사용자가 프로필을 조회할 수 있음 (공개 정보만)
CREATE POLICY "모든_사용자_프로필_조회_가능" 
  ON profiles FOR SELECT 
  USING (true);

-- RLS 정책: 사용자는 자신의 프로필만 삽입할 수 있음
CREATE POLICY "사용자_본인_프로필_생성_가능" 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- RLS 정책: 사용자는 자신의 프로필만 수정할 수 있음
CREATE POLICY "사용자_본인_프로필_수정_가능" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS 정책: 사용자는 자신의 프로필만 삭제할 수 있음
CREATE POLICY "사용자_본인_프로필_삭제_가능" 
  ON profiles FOR DELETE 
  USING (auth.uid() = id);

-- 새로운 사용자 가입 시 자동으로 프로필을 생성하는 함수
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER 
SECURITY DEFINER SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    username, 
    name, 
    avatar_url, 
    email,
    marketing_consent,
    marketing_consent_date
  )
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'username',
    NEW.raw_user_meta_data->>'name',
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'marketing_consent')::BOOLEAN, false),
    CASE 
      WHEN (NEW.raw_user_meta_data->>'marketing_consent')::BOOLEAN = true 
      THEN CURRENT_TIMESTAMP 
      ELSE NULL 
    END
  );
  
  RETURN NEW;
END;
$$;

-- 사용자 정보 업데이트 시 프로필도 업데이트하는 함수
CREATE OR REPLACE FUNCTION public.handle_user_update() 
RETURNS TRIGGER 
SECURITY DEFINER SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- 간단하지만 안전한 업데이트 (NULL 값 보호 포함)
  UPDATE public.profiles 
  SET 
    username = COALESCE(NEW.raw_user_meta_data->>'username', username),
    name = COALESCE(NEW.raw_user_meta_data->>'name', name),
    avatar_url = COALESCE(NEW.raw_user_meta_data->>'avatar_url', avatar_url),
    email = NEW.email,
    marketing_consent = COALESCE((NEW.raw_user_meta_data->>'marketing_consent')::BOOLEAN, marketing_consent),
    marketing_consent_date = CASE 
      WHEN (NEW.raw_user_meta_data->>'marketing_consent')::BOOLEAN = true AND marketing_consent = false
      THEN CURRENT_TIMESTAMP 
      ELSE marketing_consent_date
    END,
    updated_at = CURRENT_TIMESTAMP
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$;

-- 새 사용자 생성 시 트리거
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 사용자 정보 업데이트 시 트리거
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_update();

-- 아바타 이미지 저장을 위한 스토리지 버킷 생성
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- 스토리지 접근 정책 설정
CREATE POLICY "아바타_이미지_공개_조회_가능" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'avatars');

CREATE POLICY "모든_사용자_아바타_업로드_가능" 
  ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "사용자_본인_아바타_업데이트_가능"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'avatars' AND auth.uid()::TEXT = (storage.foldername(name))[1]);

CREATE POLICY "사용자_본인_아바타_삭제_가능"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'avatars' AND auth.uid()::TEXT = (storage.foldername(name))[1]);

-- ==============================================
-- 1. 회원관리.sql 롤백 SQL (모든 변경사항을 되돌리기 위한 코드)
-- 필요시 주석을 해제하고 실행하세요
-- ==============================================

/*
-- 1. 스토리지 정책들 삭제
DROP POLICY IF EXISTS "사용자_본인_아바타_삭제_가능" ON storage.objects;
DROP POLICY IF EXISTS "사용자_본인_아바타_업데이트_가능" ON storage.objects;
DROP POLICY IF EXISTS "모든_사용자_아바타_업로드_가능" ON storage.objects;
DROP POLICY IF EXISTS "아바타_이미지_공개_조회_가능" ON storage.objects;

-- 2. 스토리지 버킷 삭제
DELETE FROM storage.buckets WHERE id = 'avatars';

-- 3. 트리거들 삭제
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 4. 함수들 삭제
DROP FUNCTION IF EXISTS public.handle_user_update();
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 5. RLS 정책들 삭제
DROP POLICY IF EXISTS "사용자_본인_프로필_삭제_가능" ON profiles;
DROP POLICY IF EXISTS "사용자_본인_프로필_수정_가능" ON profiles;
DROP POLICY IF EXISTS "사용자_본인_프로필_생성_가능" ON profiles;
DROP POLICY IF EXISTS "모든_사용자_프로필_조회_가능" ON profiles;

-- 6. profiles 테이블 삭제
DROP TABLE IF EXISTS profiles;
*/