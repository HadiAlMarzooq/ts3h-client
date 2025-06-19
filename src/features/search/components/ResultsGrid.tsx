"use client";

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

type Result = {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  trackViewUrl: string;
};

type Props = {
  results: Result[];
};

export const ResultsGrid = ({ results }: Props) => {
  if (results.length === 0) return null;

  return (
    <div className="w-full mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {results.map((item) => (
        <Card key={item.trackId} className="text-right">
          <img
            src={item.artworkUrl100}
            alt={item.trackName}
            className="rounded-t w-full object-cover"
          />
          <CardContent className="pt-4">
            <CardTitle className="text-lg">{item.trackName}</CardTitle>
            <CardDescription className="mb-3 text-gray-600">
              {item.artistName}
            </CardDescription>
            <a
              href={item.trackViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              استمع الآن
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
