"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@worklive/ui";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => setMounted(true), []);

  function changeTheme() {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    setTheme(isDark ? "light" : "dark");
    window.setTimeout(() => root.classList.remove("theme-transition"), 280);
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Włącz jasny motyw" : "Włącz ciemny motyw"}
      onClick={changeTheme}
      className="rounded-xl text-muted-foreground"
      disabled={!mounted}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
