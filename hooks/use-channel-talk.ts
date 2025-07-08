"use client";

import ChannelService from "@/lib/channel-talk";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function useChannelTalk() {
  const supabase = createClient();

  useEffect(() => {
    if (!window.ChannelIO) {
      ChannelService.loadScript();
    }

    const bootChannelTalk = (user?: any) => {
      const commonConfig = {
        pluginKey: process.env.NEXT_PUBLIC_CHANNEL_TALK_KEY!,
        customLauncherSelector: ".contact-button",
      };

      if (user) {
        return ChannelService.boot({
          ...commonConfig,
          memberId: user.id,
          profile: {
            name: user.user_metadata.name,
            email: user.email,
          },
        });
      }

      return ChannelService.boot(commonConfig);
    };

    const initializeChannelTalk = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      bootChannelTalk(user);
    };

    initializeChannelTalk();

    // Auth 상태 변경 감지
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          // 로그인 시
          bootChannelTalk(session.user);
        } else if (event === "SIGNED_OUT") {
          // 로그아웃 시
          ChannelService.shutdown();
          bootChannelTalk();
        }
      }
    );

    // 컴포넌트 언마운트 시 정리
    return () => {
      authListener.subscription.unsubscribe();
      ChannelService.shutdown();
    };
  }, []);
}
