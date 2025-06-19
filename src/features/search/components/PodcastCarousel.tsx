"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";

type Podcast = {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl600: string;
  collectionViewUrl: string;
};

type Props = {
  items: Podcast[];
  term: string;
};

export const PodcastCarousel = ({ items, term }: Props) => {
  if (!items?.length) return null;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold text-right mb-4 px-2">
        أفضل البودكاستات لـ “{term}”
      </h2>
      <ScrollArea className="w-full overflow-x-auto">
        <div className="flex gap-4 pb-4">
          {items.map((podcast) => (
            <a
              key={podcast.collectionId}
              href={podcast.collectionViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-36 flex-shrink-0 hover:opacity-90 transition"
            >
              <div className="aspect-square overflow-hidden rounded-lg border">
                <Image
                  src={podcast.artworkUrl600}
                  alt={podcast.collectionName}
                  width={600}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-sm font-semibold mt-2 line-clamp-1 text-right">
                {podcast.collectionName}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-1 text-right">
                {podcast.artistName}
              </p>
            </a>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
