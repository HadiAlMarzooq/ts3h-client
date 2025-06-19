"use client";

import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import logo from "/public/logo/logo.png";

import { SearchInput } from "./components/SearchInput";
import { SearchSectionTitle } from "./components/SearchSectionTitle";
import { PodcastCarousel } from "./components/PodcastCarousel";
import { EpisodeList } from "./components/EpisodeList";
import { SearchEmpty } from "./components/SearchEmpty";
import { SearchLoading } from "./components/SearchLoading";
import { Skeleton } from "@/components/ui/skeleton";

type ViewState = "initial" | "results";

type SearchResults = {
  podcasts: any[];
  episodes: any[];
};

export const SearchWrapper = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<SearchResults>({
    podcasts: [],
    episodes: [],
  });
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<ViewState>("initial");

  const handleSearch = async () => {
    if (!term.trim()) return;

    setLoading(true);
    setResults({ podcasts: [], episodes: [] });

    try {
      const res = await fetch(
        `https://ts3h-api.onrender.com/search/structured?term=${encodeURIComponent(
          term
        )}`
      );
      const data = await res.json();

      if (!data || (!data.podcasts?.length && !data.episodes?.length)) {
        toast("لا توجد نتائج لهذا البحث.");
        setView("results");
        return;
      }

      setResults({
        podcasts: data.podcasts || [],
        episodes: data.episodes || [],
      });
      toast.success("تم جلب النتائج بنجاح.");
      setView("results");
    } catch (err) {
      toast.error("حدث خطأ أثناء جلب النتائج. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const isInitial = view === "initial";

  return (
    <div className="min-h-screen px-4 py-10 max-w-6xl mx-auto font-arabic text-right">
      <div
        className={`transition-all duration-700 ease-in-out ${
          isInitial
            ? "flex flex-col items-center justify-center mb-12"
            : "flex items-center gap-6 mb-6"
        }`}
      >
        <Image
          src={logo}
          alt="شعار تسعة"
          className={`transition-all duration-700 ease-in-out transform ${
            isInitial ? "w-48 translate-y-0" : "w-24 -translate-y-1"
          }`}
          priority
        />

        {!isInitial && (
          <div className="flex-1">
            <SearchInput
              term={term}
              setTerm={setTerm}
              onSearch={handleSearch}
              loading={loading}
              fullWidth={false}
            />
          </div>
        )}
      </div>

      {isInitial && (
        <SearchInput
          term={term}
          setTerm={setTerm}
          onSearch={handleSearch}
          loading={loading}
          fullWidth
        />
      )}

      {view === "results" && (
        <>
          {loading && (
            <>
              <div className="mt-10">
                <div className="mb-4 w-40 h-6 ml-auto">
                  <Skeleton className="w-full h-full" />
                </div>
                <SearchLoading />
              </div>

              <div className="mt-10">
                <div className="mb-4 w-40 h-6 ml-auto">
                  <Skeleton className="w-full h-full" />
                </div>
                <SearchLoading />
              </div>
            </>
          )}

          {!loading &&
            results.podcasts.length === 0 &&
            results.episodes.length === 0 && <SearchEmpty />}

          {!loading && results.podcasts.length > 0 && (
            <>
              <PodcastCarousel items={results.podcasts} term={term} />
            </>
          )}

          {!loading && results.episodes.length > 0 && (
            <>
              <SearchSectionTitle title="الحلقات" />
              <EpisodeList items={results.episodes} />
            </>
          )}
        </>
      )}
      <footer className="mt-20 text-center text-sm text-muted-foreground border-t pt-6">
        <p>
          تم التطوير بواسطة{" "}
          <span className="font-semibold text-primary">فريق تسعة</span> ©{" "}
          {new Date().getFullYear()}
        </p>

        <p className="mt-2">
          الشركة الرائدة في مجال البودكاست في العالم العربي بعد رقم ثمانية
        </p>
      </footer>
    </div>
  );
};
