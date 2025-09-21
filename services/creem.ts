"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import type { CreemCheckoutOptions, UserSubscription } from "@/types/userType";

const CREEM_API_BASE_URL = process.env.CREEM_BASE_URL;
const CREEM_API_KEY = process.env.CREEM_API_KEY;

/**
 * Creem API 공통 헤더
 */
function getHeaders() {
  return {
    "Content-Type": "application/json",
    "x-api-key": CREEM_API_KEY || "", // ✅ Bearer → x-api-key
  };
}

/**
 * Creem Checkout 생성
 */
export async function createCheckout(
  options: CreemCheckoutOptions
): Promise<{ url: string }> {
  const response = await fetch(`${CREEM_API_BASE_URL}/v1/checkouts`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      product_id: options.productId, // ✅ snake_case
      units: options.units || 1,
      customer: {
        email: options.email,
      },
      success_url:
        options.successUrl ||
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`, // ✅ snake_case
      ...(options.discountCode && { discount_code: options.discountCode }),
      metadata: {
        userId: options.userId,
        ...options.metadata,
      },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("❌ Creem API error full response:", data);
    throw new Error(data.message || "결제 세션 생성에 실패했습니다.");
  }

  // ✅ Creem은 checkout_url 로 응답
  return { url: data.checkout_url };
}

/**
 * 사용자의 구독 정보 조회
 */
export async function getUserSubscriptionServer(
  userId: string
): Promise<UserSubscription | null> {
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("subscription")
    .eq("id", userId)
    .single();

  if (error || !data || !data.subscription) {
    return null;
  }

  return data.subscription as UserSubscription;
}

/**
 * 사용자의 Creem Customer ID 업데이트
 */
export async function updateUserCustomerIdServer(
  userId: string,
  customerId: string
): Promise<void> {
  const supabase = await createAdminClient();

  const { error } = await supabase
    .from("profiles")
    .update({
      customer_id: customerId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) {
    throw new Error(`Customer ID 업데이트에 실패했습니다: ${error.message}`);
  }
}

/**
 * 사용자의 구독 정보 업데이트
 */
export async function updateUserSubscriptionServer(
  userId: string,
  subscriptionData: Partial<UserSubscription>
): Promise<void> {
  const supabase = await createAdminClient();

  const { error } = await supabase
    .from("profiles")
    .update({
      subscription: subscriptionData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) {
    throw new Error(`구독 정보 업데이트에 실패했습니다: ${error.message}`);
  }
}

/**
 * Creem 고객 포털 URL 생성
 */
export async function getCustomerPortalUrl(
  customerId: string
): Promise<string> {
  const response = await fetch(`${CREEM_API_BASE_URL}/v1/customers/billing`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      customer_id: customerId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("❌ Creem Portal API error:", data);
    throw new Error(data.message || "고객 포털 URL 생성에 실패했습니다.");
  }

  return data.customer_portal_link;
}
