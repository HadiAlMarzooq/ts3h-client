"use client";

import Image from "next/image";
import { cn } from "@/lib/utils"; // optional: tailwind class merging helper

type LogoProps = {
  compact?: boolean;
};

export const Logo = ({ compact = false }: LogoProps) => {
  return (
    <div
      className={cn(
        "transition-all duration-500 ease-in-out",
        compact
          ? "absolute top-4 right-4 w-20 sm:w-24"
          : "flex justify-center w-full mb-8"
      )}
    >
      <Image
        src="/logo/logo.png"
        alt="شعار المنصة"
        width={compact ? 80 : 180}
        height={compact ? 80 : 180}
        className="object-contain rounded-md"
        priority
      />
    </div>
  );
};
