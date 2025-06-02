// File: app/(main)/pre-interview-rankings/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { getJobPostings, submitJobRankings } from "@/app/api/utils";
import { JobPosting } from "@/types/jobs";

export default function PreInterviewRankingsPage() {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);

  useEffect(() => {

    (async () => {

      try {
        const fetched = (await getJobPostings()) as JobPosting[];
        setJobPostings(fetched.map((j) => ({ ...j, isFavourited: false })));
      } catch (err) {
        console.error("getJobPostings failed:", err);
      }
    })
  })

  return (
    <div className="w-full p-4">
      Job Rankings
    </div>
  );
}
