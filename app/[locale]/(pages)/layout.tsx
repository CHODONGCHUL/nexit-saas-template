import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import ChannelTalkProvider from "@/app/channel-talk-provider";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full">
      <Navbar />
      <ChannelTalkProvider>
        <div className="pt-32">{children}</div>
      </ChannelTalkProvider>
      <Footer />
    </div>
  );
}
