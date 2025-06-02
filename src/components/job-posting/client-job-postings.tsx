"use client"

import React, { useState } from "react"
import JobPostings from "@/components/ui/JobPostings"
import { JobPosting } from "@/types/job-posting"

interface Props {
  initialJobPostings: JobPosting[]
  error: string | null
}

export default function ClientJobPostings({ initialJobPostings, error }: Props) {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>(
    initialJobPostings.map(job => ({ ...job, isFavourited: false }))
  )
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
