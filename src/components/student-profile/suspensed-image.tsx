"use client"

import Image from "next/image";
import { useState } from "react";

export const SuspensedImage = ({ imageURL }: { imageURL: string }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-64 w-64">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse rounded-full bg-muted" />
      )}
      <Image
        className={`rounded-full transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        src={imageURL}
        alt="Image of the student"
        fill={true}
        onLoadingComplete={() => setLoaded(true)}
      />
    </div>
  );
}
