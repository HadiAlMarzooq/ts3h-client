"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";

type Result = {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  trackViewUrl: string;
};

type TopResultsCarouselProps = {
  items: Result[];
};

export const TopResultsCarousel = ({ items }: TopResultsCarouselProps) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="w-full mt-8">
      <h2 className="text-xl font-bold text-right mb-4 px-2">النتائج الأهم</h2>
      <ScrollArea className="w-full whitespace-nowrap overflow-x-auto rounded-md border p-4">
        <div className="flex gap-4">
          {items.map((item) => (
            <a
              key={item.trackId}
              href={item.trackViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-40 sm:w-48 bg-muted border border-gray-200 rounded-lg p-2 hover:shadow-md transition"
            >
              <Image
                src={item.artworkUrl100}
                alt={item.trackName}
                width={100}
                height={100}
                className="rounded w-full mb-2"
              />
              <h3 className="text-sm font-semibold text-right truncate">
                {item.trackName}
              </h3>
              <p className="text-xs text-gray-600 text-right truncate">
                {item.artistName}
              </p>
            </a>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
