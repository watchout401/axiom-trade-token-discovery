"use client";

import { useEffect, useRef, useState } from "react";

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
}

export function useResponsive(): ResponsiveState {
  const hasWindow = typeof window !== "undefined";
  // Default to desktop width during SSR to prevent hydration mismatch
  const getWidth = () => (hasWindow ? window.innerWidth : 1024);

  const [width, setWidth] = useState<number>(getWidth());
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!hasWindow) return;

    // Set actual width after mount to prevent hydration mismatch
    // eslint-disable-next-line react-hooks/set-state-in-effect -- necessary for hydration safety and responsive updates
    setWidth(window.innerWidth);
    setMounted(true);

    const onResize = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setWidth(window.innerWidth);
      }, 100);
    };

    window.addEventListener("resize", onResize);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [hasWindow]);

  // During SSR and initial render, default to desktop to match server
  const safeWidth = mounted ? width : 1024;

  return {
    isMobile: safeWidth < 640,
    isTablet: safeWidth >= 640 && safeWidth < 1024,
    isDesktop: safeWidth >= 1024,
    width: safeWidth,
  };
}


