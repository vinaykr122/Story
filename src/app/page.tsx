"use client";

import { useState } from "react";
import { OpeningTrailer } from "@/components/OpeningTrailer";
import { Scrapbook } from "@/components/Scrapbook";

export default function Home() {
  const [showTrailer, setShowTrailer] = useState(true);

  return (
    <main className="flex-1 w-full h-full relative">
      {showTrailer ? (
        <OpeningTrailer onComplete={() => setShowTrailer(false)} />
      ) : (
        <Scrapbook />
      )}
    </main>
  );
}
