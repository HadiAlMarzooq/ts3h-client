"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";

export default function HomePage() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!term.trim()) return;
    setLoading(true);
    setResults([]);

    try {
      const res = await fetch(
        `https://ts3h-api.onrender.com/search?term=${encodeURIComponent(term)}`
      );
      const data = await res.json();

      if (!data || data.length === 0) {
        toast("لا توجد نتائج لهذا البحث.");
        return;
      }

      setResults(data);
      toast.success("تم جلب النتائج بنجاح.");
    } catch (err) {
      toast.error("حدث خطأ أثناء جلب النتائج. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-white px-4 py-10 mx-auto font-arabic"
      dir="rtl"
    >
      <div className="relative mb-8">
        <div
          className={`transition-all duration-500 ${
            results.length > 0
              ? "absolute top-0 right-0 w-28"
              : "flex justify-center"
          }`}
        >
          <Image
            src="/logo/logo.png"
            alt="شعار"
            width={results.length > 0 ? 80 : 180}
            height={results.length > 0 ? 80 : 180}
            className="rounded-md object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="w-full sm:w-[500px] flex flex-col items-center gap-3">
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="اكتب اسم الأغنية أو الفنان..."
            className="border border-gray-900 rounded-lg px-4 py-3 w-full text-right focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
          <Button
            onClick={handleSearch}
            variant="destructive"
            className="bg-black text-white px-6 py-3 w-full sm:w-auto rounded-lg font-medium hover:bg-gray-800 transition"
          >
            ابحث
          </Button>
        </div>
      </div>

      {loading && (
        <p className="text-center text-gray-600 mt-6">جاري تحميل النتائج...</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 justify-center items-center">
        {results.map((item) => (
          <div
            key={item.trackId}
            className="bg-gray-50 max-w-xl border border-gray-20  rounded-lg p-4 shadow-sm hover:shadow-md transition text-right"
          >
            <img
              src={item.artworkUrl100}
              alt={item.trackName}
              className="rounded mb-3 w-full"
            />
            <h2 className="font-semibold text-lg mb-1">{item.trackName}</h2>
            <p className="text-sm text-gray-600 mb-2">{item.artistName}</p>
            <a
              href={item.trackViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              استمع الآن
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
