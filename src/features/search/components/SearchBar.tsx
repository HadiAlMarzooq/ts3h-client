"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SearchBarProps = {
  onSearch: (term: string) => void;
  loading?: boolean;
};

export const SearchBar = ({ onSearch, loading = false }: SearchBarProps) => {
  const [term, setTerm] = useState("");

  const handleSearch = () => {
    if (term.trim()) onSearch(term);
  };

  return (
    <div className="flex flex-col items-center w-full sm:w-[500px] gap-3">
      <Input
        type="text"
        placeholder="اكتب اسم الأغنية أو الفنان..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="text-right w-full"
      />
      <Button onClick={handleSearch} disabled={loading} className="w-full sm:w-auto">
        {loading ? "جارٍ البحث..." : "ابحث"}
      </Button>
    </div>
  );
};
