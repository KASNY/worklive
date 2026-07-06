"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { BrandLogo } from "@worklive/ui";

export function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timeout = window.setTimeout(() => router.replace("/login"), 1650);
    return () => window.clearTimeout(timeout);
  }, [router]);

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#081120] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(37,99,235,0.22),transparent_36%)]" />
      <div className="relative flex flex-col items-center">
        <div className="animate-splash-mark">
          <BrandLogo variant="dark" size={44} />
        </div>
        <p className="mt-6 text-xs font-medium tracking-[0.2em] text-slate-400 uppercase">
          Twój operacyjny workspace
        </p>
        <div className="mt-8 h-0.5 w-32 overflow-hidden rounded-full bg-white/10">
          <div className="animate-splash-progress h-full bg-blue-500" />
        </div>
      </div>
      <p className="absolute bottom-8 text-xs text-slate-500">WorkLive · 2026</p>
    </main>
  );
}
