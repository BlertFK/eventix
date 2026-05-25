"use client";

import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});

export default function DesktopEffects() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
    </>
  );
}
