'use client';

import ResultWrapper from "@/components/results/ResultWrapper";

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-switzer lg:bg-white w-full flex flex-col lg:flex-row px-4 lg:p-4 rounded-2xl lg:shadow-lg">
      <ResultWrapper>
        { children }
      </ResultWrapper>
    </div>
  );
}