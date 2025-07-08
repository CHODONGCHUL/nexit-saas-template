export interface RegisterUserInput {
  email: string;
  username: string;
  password: string;
  name: string;
  marketingConsent?: boolean;
  referralCode?: string;
}

export interface SigninUserInput {
  email: string;
  password: string;
}

export interface UpdateUserInput {
  email: string;
  username: string;
  name: string;
  avatar_url?: string;
  marketing_consent?: boolean;
}

export interface AvatarUploadResult {
  url: string;
  path: string;
}

/**
 * 사용자 구독 정보 타입 (JSON으로 저장)
 */
export interface UserSubscription {
  id?: string | null;
  status?: string | null;
  product_id?: string | null;
  product_name?: string | null;
  amount?: number | null;
  currency?: string | null;
  interval?: string | null;
  current_period_start?: string | null;
  current_period_end?: string | null;
  canceled_at?: string | null;
}

/**
 * Creem 체크아웃 옵션
 */
export interface CreemCheckoutOptions {
  productId: string;
  userId: string;
  email: string;
  successUrl: string;
  units?: number;
  discountCode?: string;
  metadata?: Record<string, any>;
}
