"use client";

import { Card, CardContent } from "@/components/ui/card";

type Track = {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  trackViewUrl: string;
};

type Props = {
  results: Track[];
};

export const SearchResults = ({ results }: Props) => {
  if (!results.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
      {results.map((item) => (
        <Card key={item.trackId} className="hover:shadow-md transition">
          <CardContent className="p-4 space-y-3 text-right">
            <img
              src={item.artworkUrl100}
              alt={item.trackName}
              className="rounded w-full"
            />
            <h2 className="font-semibold text-lg">{item.trackName}</h2>
            <p className="text-sm text-muted-foreground">{item.artistName}</p>
            <a
              href={item.trackViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              استمع الآن
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
