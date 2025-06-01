"use client"

import React from "react";
import { useState } from "react"
import { useEffect } from "react";
import { getJobPostings } from "../../api/utils";
import JobPostings from "@/components/ui/JobPostings";
import { JobPosting } from "@/types/job-posting";

export default function JobsBoard() {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([])

  useEffect(() => {
    (async () => {
      console.log("Starting fetchJobPostings…")
      try {
        const jobPostings = [] = await getJobPostings()

        console.log("Fetched jobs", jobPostings)

        setJobPostings(jobPostings.map(job => ({
          ...job,
          isFavourited: false
        })))
      } catch (err) {
        console.error("getJobPostings failed:", err)
      }
    })()
  }, [])

  const toggleFavourite = (id: string) => {
    setJobPostings(current =>
      current.map(job =>
        job.id === id
          ? { ...job, isFavourited: !job.isFavourited }
          : job
      )
    )
  }

  const handleInfoClick = (job: JobPosting) => {
    console.log("Info clicked for:", job.company)
  }

  return (
    <div className="flex w-screen flex-col px-8 pt-16 md:pt-20">
      <JobPostings jobPostings={jobPostings} onToggleFavourite={toggleFavourite} onInfoClick={handleInfoClick} />
    </div>
  )
}
