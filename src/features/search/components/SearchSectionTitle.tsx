"use client";

type Props = {
  title: string;
};

export const SearchSectionTitle = ({ title }: Props) => {
  return (
    <h2 className="text-xl font-bold text-right mb-6 px-2">
      {title}
    </h2>
  );
};
