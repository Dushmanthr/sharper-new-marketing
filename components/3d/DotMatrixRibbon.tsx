"use client";

import dynamic from "next/dynamic";
import React from "react";

const DotMatrixTicker = dynamic(() => import("./DotMatrixTicker"), {
  ssr: false,
  loading: () => (
    <div className="h-[90px] sm:h-[110px] w-full bg-navy-950/70 border-y border-white/10" />
  ),
});

export default function DotMatrixRibbon({
  text,
  speed,
  className,
}: {
  text?: string;
  speed?: number;
  className?: string;
}) {
  return <DotMatrixTicker text={text} speed={speed} className={className} />;
}
