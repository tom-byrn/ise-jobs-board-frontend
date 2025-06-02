"use client"

import React from "react";
import { useState } from "react"
import { useEffect } from "react";
import { getJobPostings } from "../../api/utils";
import JobPostings from "@/components/ui/JobPostings";
<<<<<<< HEAD
import { JobPosting } from "@/types/jobs";


export default function JobsBoard() {

=======
import { JobPosting } from "@/types/job-posting";

export default function JobsBoard() {
>>>>>>> c500c6a893dafb43c651c48186ae1fe07cbdcb0c
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([])

  useEffect(() => {
    (async () => {
      console.log("Starting fetchJobPostings…")
      try {
        const jobPostings = [] = await getJobPostings()

        jobPostings.sort((postingA, postingB) => postingA.company.name.localeCompare(postingB.company.name))

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
