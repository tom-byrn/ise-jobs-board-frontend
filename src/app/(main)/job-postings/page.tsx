"use client"

import React from "react";
import { useState } from "react"
import { useEffect } from "react";
import { getJobPostings } from "../../api/utils";
import JobPostings from "@/components/ui/JobPostings";


export default function JobsBoard() {


  interface JobPosting {
    id: string;
    job_title: string;
    salary: string;
    accommodation_support: string;
    position_count: number;
    location: string;
    company: {
      name: string;
      company_profile: {
        avatar: string;
      };
    };
    isFavourited: boolean;
  }
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([])


  useEffect(() => {
    (async () => {
      console.log('⏳ Starting fetchJobPostings…')
      try {
        const jobPostings= [] = await getJobPostings()
        console.log('🎉 Fetched jobs', jobPostings)
        setJobPostings(jobPostings.map(job => ({
          ...job,
          isFavourited: false
        })))
      } catch (err) {
        console.error('🔥 getJobPostings failed:', err)
      }
    })()
  }, [])

  const toggleFavorite = (id: string) => {
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
      <JobPostings jobPostings={jobPostings} onToggleFavorite={toggleFavorite} onInfoClick={handleInfoClick} />
    </div>
  )
}
