"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
  onSearch: (term: string) => void;
  loading?: boolean;
};

export const SearchInputWithButton = ({ onSearch, loading }: Props) => {
  const [term, setTerm] = useState("");

  const handleSubmit = () => {
    const trimmed = term.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full max-w-xl mx-auto">
      <Input
        type="text"
        dir="rtl"
        placeholder="اكتب اسم الأغنية أو الفنان..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        disabled={loading}
        className="text-right"
      />
      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full sm:w-auto"
      >
        {loading ? "جاري البحث..." : "ابحث"}
      </Button>
    </div>
  );
};
