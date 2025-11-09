"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

interface TokenAvatarProps {
  src: string;
  name: string;
  size?: number;
  className?: string;
}

const colors = ["#3B82F6", "#22C55E", "#F97316", "#A855F7", "#EC4899", "#38BDF8"];

export function TokenAvatar({ src, name, size = 60, className }: TokenAvatarProps) {
  const [hasError, setHasError] = useState(false);
  const initials = useMemo(() => name.trim().charAt(0).toUpperCase(), [name]);
  const background = useMemo(() => {
    const code = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[code % colors.length];
  }, [name]);

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-lg border border-border/80 bg-surface shadow-sm",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {!hasError ? (
        <Image
          src={src}
          alt={name}
          width={size}
          height={size}
          className="h-full w-full object-cover"
          onError={() => setHasError(true)}
          priority={size > 50}
        />
      ) : (
        <span
          className="flex h-full w-full items-center justify-center text-lg font-semibold text-white"
          style={{ background }}
        >
          {initials}
        </span>
      )}
    </div>
  );
}

