import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  changePassword,
  deleteUser,
  getCurrentUser,
  getCurrentUserProfile,
  signInUser,
  signOutUser,
  signUpUser,
  updateUser,
  signInWithKakao,
  signInWithGoogle,
  getUserRole,
  uploadAvatar,
  deleteAvatar,
  getUserSubscription,
  updateUserSubscription,
  hasActiveSubscription,
  hasSubscriptionPlan,
  getMembershipLevel,
} from "@/services/user";
import type { UserSubscription } from "@/types/userType";

export function useSignUpUser() {
  return useMutation({
    mutationFn: signUpUser,
  });
}

export function useSigninUser() {
  return useMutation({
    mutationFn: signInUser,
  });
}

export function useSignOutUser() {
  return useMutation({
    mutationFn: signOutUser,
  });
}

export function useUpdateUser() {
  return useMutation({
    mutationFn: updateUser,
  });
}

export function useDeleteUser() {
  return useMutation({
    mutationFn: deleteUser,
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
  });
}

export function useUploadAvatar() {
  return useMutation({
    mutationFn: uploadAvatar,
  });
}

export function useDeleteAvatar() {
  return useMutation({
    mutationFn: deleteAvatar,
  });
}

export function useSignInWithKakao() {
  return useMutation({
    mutationFn: signInWithKakao,
  });
}

export function useSignInWithGoogle() {
  return useMutation({
    mutationFn: signInWithGoogle,
  });
}

export function useUserRole() {
  return useQuery({
    queryKey: ["userRole"],
    queryFn: getUserRole,
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
}

/**
 * 프로필 정보를 포함한 현재 사용자 조회 훅
 */
export function useCurrentUserProfile() {
  return useQuery({
    queryKey: ["currentUserProfile"],
    queryFn: getCurrentUserProfile,
  });
}

/**
 * 사용자 구독 정보 조회 훅
 */
export function useUserSubscription(userId?: string) {
  return useQuery({
    queryKey: ["user-subscription", userId],
    queryFn: () => getUserSubscription(userId),
    enabled: !!userId,
  });
}

/**
 * 사용자 구독 정보 업데이트 훅
 */
export function useUpdateUserSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      subscriptionData,
    }: {
      userId: string;
      subscriptionData: Partial<UserSubscription>;
    }) => updateUserSubscription(userId, subscriptionData),
    onSuccess: (_, variables) => {
      // 관련 쿼리들 무효화
      queryClient.invalidateQueries({
        queryKey: ["user-subscription", variables.userId],
      });
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
  });
}

/**
 * 활성 구독 여부 확인 훅
 */
export function useHasActiveSubscription(userId?: string) {
  return useQuery({
    queryKey: ["has-active-subscription", userId],
    queryFn: () => hasActiveSubscription(userId),
    enabled: !!userId,
  });
}

/**
 * 특정 플랜 구독 여부 확인 훅
 */
export function useHasSubscriptionPlan(planName: string, userId?: string) {
  return useQuery({
    queryKey: ["has-subscription-plan", planName, userId],
    queryFn: () => hasSubscriptionPlan(planName, userId),
    enabled: !!userId && !!planName,
  });
}

/**
 * 멤버십 레벨 조회 훅
 */
export function useMembershipLevel(userId?: string) {
  return useQuery({
    queryKey: ["membership-level", userId],
    queryFn: () => getMembershipLevel(userId),
    enabled: !!userId,
  });
}
