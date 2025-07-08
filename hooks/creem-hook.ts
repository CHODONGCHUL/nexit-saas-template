import { useMutation } from "@tanstack/react-query";
import { createCheckout } from "@/services/creem";
import type { CreemCheckoutOptions } from "@/types/userType";

export function useCreemCheckout() {
  return useMutation({
    mutationFn: createCheckout,
  });
}
