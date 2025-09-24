import { createClient } from "@/lib/supabase/client";
import type {
  RegisterUserInput,
  SigninUserInput,
  UpdateUserInput,
  AvatarUploadResult,
  UserSubscription,
} from "@/types/userType";

const supabase = createClient();

/**
 * 현재 로그인된 유저 반환 (세션 없으면 null)
 */
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.warn("Supabase Auth Error:", error.message);
    return null; // ✅ throw 대신 null 반환
  }

  return data?.user ?? null;
}

/**
 * 현재 유저 + 프로필 조회
 */
export async function getCurrentUserProfile() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.warn("Auth Error:", error.message);
    return null;
  }
  if (!data.user) return null;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (profileError) {
    console.warn("Profile fetch error:", profileError.message);
    return null;
  }

  return { ...data.user, profile };
}

/**
 * 유저 역할(role) 조회
 */
export async function getUserRole() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;

  const { data: roleData, error: roleError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (roleError) {
    console.warn("Role fetch error:", roleError.message);
    return null;
  }

  return roleData;
}

/**
 * 회원가입
 */
export async function signUpUser(props: RegisterUserInput) {
  const { username, name, email, password, marketingConsent } = props;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        name,
        marketing_consent: marketingConsent || false,
      },
    },
  });

  if (error) throw error;
  return data;
}

/**
 * 로그인
 */
export async function signInUser(props: SigninUserInput) {
  const { email, password } = props;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

/**
 * 로그아웃
 */
export async function signOutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * 유저 정보 업데이트
 */
export async function updateUser(props: UpdateUserInput) {
  const { email, username, name, avatar_url, marketing_consent } = props;

  const userData: any = { email, username, name };
  if (avatar_url !== undefined) userData.avatar_url = avatar_url;
  if (marketing_consent !== undefined) userData.marketing_consent = marketing_consent;

  const { data, error } = await supabase.auth.updateUser({
    email,
    data: userData,
  });

  if (error) throw error;
  return data;
}

/**
 * 유저 삭제
 */
export async function deleteUser(id: string) {
  const { data, error } = await supabase.from("profiles").delete().eq("id", id);
  if (error) throw error;
  return data;
}

/**
 * 비밀번호 변경
 */
export async function changePassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
  return data;
}

/**
 * 아바타 업로드
 */
export async function uploadAvatar(file: File): Promise<AvatarUploadResult> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw new Error("User not authenticated");

  const user = data.user;
  const fileExt = file.name.split(".").pop();
  const fileName = `${user.id}/avatar.${fileExt}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (uploadError) throw uploadError;

  const { data: publicData } = supabase.storage.from("avatars").getPublicUrl(fileName);

  return { url: publicData.publicUrl, path: uploadData.path };
}

/**
 * 아바타 삭제
 */
export async function deleteAvatar(path?: string) {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw new Error("User not authenticated");

  const user = data.user;
  const { data: files, error: listError } = await supabase.storage
    .from("avatars")
    .list(user.id);

  if (listError) throw listError;

  if (files?.length) {
    const filesToDelete = files.map((file) => `${user.id}/${file.name}`);
    const { error: deleteError } = await supabase.storage
      .from("avatars")
      .remove(filesToDelete);
    if (deleteError) throw deleteError;
  }

  const { data: updateData, error: updateError } = await supabase.auth.updateUser({
    data: { avatar_url: null },
  });

  if (updateError) throw updateError;
  return updateData;
}

/**
 * 소셜 로그인
 */
export async function signInWithKakao() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: { redirectTo: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI },
  });
  if (error) throw error;
}

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI },
  });
  if (error) throw error;
}

/**
 * 구독 정보 조회
 */
export async function getUserSubscription(
  userId?: string
): Promise<UserSubscription | null> {
  if (!userId) {
    const user = await getCurrentUser();
    if (!user) return null;
    userId = user.id;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("subscription")
    .eq("id", userId)
    .single();

  if (error || !data?.subscription) return null;
  return data.subscription as UserSubscription;
}

/**
 * 구독 정보 업데이트
 */
export async function updateUserSubscription(
  userId: string,
  subscriptionData: Partial<UserSubscription>
): Promise<void> {
  const currentSubscription = await getUserSubscription(userId);

  const updatedSubscription = {
    ...currentSubscription,
    ...subscriptionData,
  };

  const { error } = await supabase
    .from("profiles")
    .update({
      subscription: updatedSubscription,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) throw new Error(`구독 정보 업데이트에 실패했습니다: ${error.message}`);
}

/**
 * 활성 구독 여부 확인
 */
export async function hasActiveSubscription(userId?: string): Promise<boolean> {
  const subscription = await getUserSubscription(userId);
  return subscription?.status === "active";
}

/**
 * 특정 플랜 구독 여부 확인
 */
export async function hasSubscriptionPlan(
  planName: string,
  userId?: string
): Promise<boolean> {
  const subscription = await getUserSubscription(userId);
  if (!subscription?.product_name) return false;
  return subscription.product_name.toLowerCase().includes(planName.toLowerCase());
}

/**
 * 구독 만료일 확인
 */
export async function getSubscriptionExpiryDate(
  userId?: string
): Promise<Date | null> {
  const subscription = await getUserSubscription(userId);
  return subscription?.current_period_end
    ? new Date(subscription.current_period_end)
    : null;
}

/**
 * 멤버십 레벨 확인
 */
export async function getMembershipLevel(
  userId?: string
): Promise<"free" | "starter" | "pro" | "enterprise"> {
  const subscription = await getUserSubscription(userId);

  if (!subscription || subscription.status !== "active") return "free";

  const productName = subscription.product_name?.toLowerCase() || "";

  if (productName.includes("enterprise")) return "enterprise";
  if (productName.includes("pro")) return "pro";
  if (productName.includes("starter")) return "starter";

  return "free";
}
