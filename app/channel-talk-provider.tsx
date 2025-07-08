"use client";

import useChannelTalk from "@/hooks/use-channel-talk";

export default function ChannelTalkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useChannelTalk();
  return <>{children}</>;
}
