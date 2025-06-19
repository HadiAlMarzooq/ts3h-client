"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  minimized: boolean;
};

export const LogoHeader = ({ minimized }: Props) => {
  return (
    <motion.div
      layout
      initial={false}
      animate={{
        justifyContent: minimized ? "flex-end" : "center",
        alignItems: minimized ? "flex-start" : "center",
      }}
      className="flex w-full mb-6"
    >
      <motion.div
        layout
        className={cn(
          "w-40 transition-all duration-500",
          minimized ? "mt-4 me-4" : ""
        )}
      >
        <Image
          src="/logo/logo.png"
          alt="ts3h logo"
          width={160}
          height={160}
          className="w-full h-auto object-contain"
          priority
        />
      </motion.div>
    </motion.div>
  );
};
