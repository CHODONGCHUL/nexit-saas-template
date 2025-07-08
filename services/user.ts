import { createClient } from "@/lib/supabase/client";
import type {
  RegisterUserInput,
  SigninUserInput,
  UpdateUserInput,
  AvatarUploadResult,
  UserSubscription,
} from "@/types/userType";
// import { processReferral } from "@/services/referral";

const supabase = createClient();

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) throw error;

  return data.user;
}

export async function getCurrentUserProfile() {
  const { data, error } = await supabase.auth.getUser();

  if (error) throw error;
  if (!data.user) return null;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (profileError) throw profileError;

  return {
    ...data.user,
    profile,
  };
}

export async function getUserRole() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not found");

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error) throw error;

  return data;
}

export async function signUpUser(props: RegisterUserInput) {
  const { username, name, email, password, marketingConsent, referralCode } =
    props;

  // 회원가입 처리
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username,
        name,
        marketing_consent: marketingConsent || false,
      },
    },
  });

  if (error) throw error;

  // if (data?.user) {
  //   // 레퍼럴 코드가 있으면 처리
  //   if (referralCode) {
  //     try {
  //       await processReferral(data.user.id, referralCode);
  //     } catch (referralError) {
  //       console.error("레퍼럴 처리 오류:", referralError);
  //       // 회원가입은 계속 진행
  //     }
  //   }
  // }

  return data;
}

export async function signInUser(props: SigninUserInput) {
  const { email, password } = props;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: {},
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
}

export async function updateUser(props: UpdateUserInput) {
  const { email, username, name, avatar_url, marketing_consent } = props;

  const userData: any = { email, username, name };
  if (avatar_url !== undefined) {
    userData.avatar_url = avatar_url;
  }
  if (marketing_consent !== undefined) {
    userData.marketing_consent = marketing_consent;
  }

  const { data, error } = await supabase.auth.updateUser({
    email,
    data: userData,
  });

  if (error) throw error;

  return data;
}

export async function deleteUser(id: string) {
  const { data, error } = await supabase.from("profiles").delete().eq("id", id);
  if (error) throw error;

  return data;
}

export async function changePassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw error;

  return data;
}

export async function uploadAvatar(file: File): Promise<AvatarUploadResult> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const fileExt = file.name.split(".").pop();
  const fileName = `${user.id}/avatar.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(fileName);

  return {
    url: publicUrl,
    path: data.path,
  };
}

export async function deleteAvatar(path?: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  // 현재 사용자의 아바타 파일들을 모두 삭제
  const { data: files, error: listError } = await supabase.storage
    .from("avatars")
    .list(user.id);

  if (listError) throw listError;

  if (files && files.length > 0) {
    const filesToDelete = files.map((file) => `${user.id}/${file.name}`);
    const { error: deleteError } = await supabase.storage
      .from("avatars")
      .remove(filesToDelete);

    if (deleteError) throw deleteError;
  }

  // 사용자 메타데이터에서 avatar_url 제거
  const { data, error } = await supabase.auth.updateUser({
    data: { avatar_url: null },
  });

  if (error) throw error;

  return data;
}

export async function signInWithKakao() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI,
    },
  });

  if (error) throw error;
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI,
    },
  });

  if (error) throw error;
}

/**
 * 사용자의 구독 정보 조회
 */
export async function getUserSubscription(
  userId?: string
): Promise<UserSubscription | null> {
  if (!userId) {
    const user = await getCurrentUser();
    if (!user) return null;
    userId = user.id;
  }

  const supabase = createClient();

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
 * 사용자의 구독 정보 업데이트
 */
export async function updateUserSubscription(
  userId: string,
  subscriptionData: Partial<UserSubscription>
): Promise<void> {
  const supabase = createClient();

  // 기존 구독 정보 가져오기
  const currentSubscription = await getUserSubscription(userId);

  // 기존 정보와 새 정보 병합
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

  if (error) {
    throw new Error(`구독 정보 업데이트에 실패했습니다: ${error.message}`);
  }
}

/**
 * 활성 구독 여부 확인
 */
export async function hasActiveSubscription(userId?: string): Promise<boolean> {
  const subscription = await getUserSubscription(userId);

  if (!subscription || !subscription.status) {
    return false;
  }

  return subscription.status === "active";
}

/**
 * 특정 플랜 구독 여부 확인
 */
export async function hasSubscriptionPlan(
  planName: string,
  userId?: string
): Promise<boolean> {
  const subscription = await getUserSubscription(userId);

  if (!subscription || !subscription.product_name) {
    return false;
  }

  return subscription.product_name
    .toLowerCase()
    .includes(planName.toLowerCase());
}

/**
 * 구독 만료일 확인
 */
export async function getSubscriptionExpiryDate(
  userId?: string
): Promise<Date | null> {
  const subscription = await getUserSubscription(userId);

  if (!subscription || !subscription.current_period_end) {
    return null;
  }

  return new Date(subscription.current_period_end);
}

/**
 * 멤버십 레벨 확인 (Starter, Pro, Enterprise)
 */
export async function getMembershipLevel(
  userId?: string
): Promise<"free" | "starter" | "pro" | "enterprise"> {
  const subscription = await getUserSubscription(userId);

  if (!subscription || subscription.status !== "active") {
    return "free";
  }

  const productName = subscription.product_name?.toLowerCase() || "";

  if (productName.includes("enterprise")) {
    return "enterprise";
  } else if (productName.includes("pro")) {
    return "pro";
  } else if (productName.includes("starter")) {
    return "starter";
  }

  return "free";
}
