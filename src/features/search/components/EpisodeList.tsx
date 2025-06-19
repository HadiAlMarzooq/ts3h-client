"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Play, MoreVertical, LayoutGrid, List } from "lucide-react";

type Episode = {
  trackId: number;
  trackName: string;
  artistName: string;
  description?: string;
  releaseDate?: string;
  trackTimeMillis?: number;
  artworkUrl160: string;
  trackViewUrl: string;
  previewUrl: string;
};

type Props = {
  items: Episode[];
};

export const EpisodeList = ({ items }: Props) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  if (!items?.length) return null;

  const formatDuration = (ms?: number) => {
    if (!ms) return "";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="mt-10">
      {/* View Toggle */}
      <div className="flex justify-end mb-4">
        <Button
          variant={viewMode === "grid" ? "default" : "outline"}
          size="sm"
          className="ml-2"
          onClick={() => setViewMode("grid")}
        >
          <LayoutGrid className="w-4 h-4 mr-1" /> عرض شبكة
        </Button>
        <Button
          variant={viewMode === "list" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("list")}
        >
          <List className="w-4 h-4 mr-1" /> عرض قائمة
        </Button>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((ep) => (
            <a
              key={ep.trackId}
              href={ep.trackViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative border rounded-lg hover:shadow transition bg-white p-4 flex flex-col text-right"
            >
              <div className="w-full h-48 relative rounded-lg overflow-hidden mb-4">
                <Image
                  src={ep.artworkUrl160}
                  alt={ep.trackName}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <Play className="text-white w-8 h-8" />
                </div>
              </div>

              <h3 className="font-semibold text-base mb-1 line-clamp-2">
                {ep.trackName}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {ep.artistName}
              </p>

              {/* Menu */}
              <div className="absolute top-2 left-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" side="right">
                    <DropdownMenuItem>أضف إلى القائمة</DropdownMenuItem>
                    <DropdownMenuItem>احفظ الحلقة</DropdownMenuItem>
                    <DropdownMenuItem>مشاركة</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-4">
          {items.map((ep) => (
            <div
              key={ep.trackId}
              className="group flex items-start p-4 border rounded-lg hover:shadow transition relative text-right"
            >
              <a
                href={ep.trackViewUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-24 h-24 relative flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={ep.artworkUrl160}
                    alt={ep.trackName}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <Play className="text-white w-8 h-8" />
                  </div>
                </div>
              </a>
              <div className="flex-1 pr-4">
                <h3 className="text-base font-semibold mb-1">{ep.trackName}</h3>
                <p className="text-sm text-muted-foreground mb-1">
                  {ep.artistName}
                </p>
                {ep.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-1">
                    {ep.description}
                  </p>
                )}
                <div className="text-xs text-muted-foreground flex flex-wrap gap-2">
                  {ep.releaseDate && (
                    <span>
                      {new Date(ep.releaseDate).toLocaleDateString("ar-EG")}
                    </span>
                  )}
                  {ep.trackTimeMillis && (
                    <span>المدة: {formatDuration(ep.trackTimeMillis)}</span>
                  )}
                </div>
              </div>
              <div className="absolute top-2 left-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" side="right">
                    <DropdownMenuItem>أضف إلى القائمة</DropdownMenuItem>
                    <DropdownMenuItem>احفظ الحلقة</DropdownMenuItem>
                    <DropdownMenuItem>مشاركة</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
