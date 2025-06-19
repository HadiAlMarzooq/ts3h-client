"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  term: string;
  setTerm: (value: string) => void;
  onSearch: () => void;
  loading?: boolean;
  fullWidth?: boolean;
};

export const SearchInput = ({
  term,
  setTerm,
  onSearch,
  loading,
  fullWidth,
}: Props) => {
  const handleSubmit = () => {
    if (!term.trim()) return;
    onSearch();
  };

  return (
    <div
      className={`w-full flex flex-col items-center gap-4 ${
        fullWidth ? "" : "mt-4"
      }`}
    >
      <Input
        type="text"
        placeholder="فنجان"
        dir="rtl"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        disabled={loading}
        className="w-full max-w-lg text-right text-lg px-6 py-5 rounded-xl border border-gray-300 focus-visible:ring-2 focus-visible:ring-black"
      />

      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full max-w-lg py-5 text-lg font-medium rounded-xl"
      >
        {loading ? "جاري البحث..." : "ابحث"}
      </Button>
    </div>
  );
};
