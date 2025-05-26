"use client"

import React from "react";
import { useState } from "react"
import JobPostings from "@/components/ui/JobPostings";
import getJobPostings from "../api/utils";

export default async function JobsBoard() {

  interface JobPosting {
    id: string
    company: string
    logo: string
    position: string
    location: string
    salary: string
    accommodationSupport: boolean
    positions: number
    isFavorited: boolean
    type: string
  }

  const strigga = await getJobPostings() satisfies JobPosting[]

  console.log(strigga)


  const jobPostings: JobPosting[] = [
    {
      id: "1",
      company: "Amazon Web Services",
      logo: "/placeholder.svg?height=40&width=40&text=AWS",
      position: "SWE Intern",
      location: "Dublin",
      salary: "€4000/month",
      accommodationSupport: true,
      positions: 2,
      isFavorited: false,
      type: "Software Engineering",
    },
    {
      id: "2",
      company: "Stripe",
      logo: "/placeholder.svg?height=40&width=40&text=Stripe",
      position: "Software Engineering Intern",
      location: "Dublin",
      salary: "€3500/month",
      accommodationSupport: true,
      positions: 2,
      isFavorited: true,
      type: "Software Engineering",
    },
    {
      id: "3",
      company: "Marina Aero",
      logo: "/placeholder.svg?height=40&width=40&text=Marina",
      position: "Software Engineering Intern",
      location: "Dublin",
      salary: "€4500/month",
      accommodationSupport: false,
      positions: 2,
      isFavorited: true,
      type: "Software Engineering",
    },
    {
      id: "4",
      company: "Marina Aero",
      logo: "/placeholder.svg?height=40&width=40&text=Marina",
      position: "Software Engineering Intern",
      location: "London",
      salary: "€3000/month",
      accommodationSupport: false,
      positions: 2,
      isFavorited: true,
      type: "Software Engineering",
    },
    {
      id: "5",
      company: "Induct",
      logo: "/placeholder.svg?height=40&width=40&text=Induct",
      position: "Founding Engineer",
      location: "Cork",
      salary: "€3500/month",
      accommodationSupport: true,
      positions: 2,
      isFavorited: false,
      type: "Engineering",
    },
    {
      id: "6",
      company: "Times",
      logo: "/placeholder.svg?height=40&width=40&text=Times",
      position: "Software Engineering Intern",
      location: "Belfast",
      salary: "€3500/month",
      accommodationSupport: true,
      positions: 2,
      isFavorited: false,
      type: "Software Engineering",
    },
  ]

  const [jobs, setJobs] = useState(jobPostings)
  // const [selectedType, setSelectedType] = useState("All")
  // const [selectedLocation, setSelectedLocation] = useState("All")
  // const [selectedSalary, setSelectedSalary] = useState("All")
  //
  const toggleFavorite = (id: string) => {
    setJobs(jobs.map((job) => (job.id === id ? { ...job, isFavorited: !job.isFavorited } : job)))
  }

  const handleInfoClick = (job: JobPosting) => {
    console.log("Info clicked for:", job.company)
    // You can implement modal or navigation logic here
  }


  return (
    <div className="flex w-screen flex-col px-8 pt-16 md:pt-20">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
      {/*   {jobPostings.map((job) => ( */}
      {/*     <JobCard key={job.id} job={job} onToggleFavorite={toggleFavorite} onInfoClick={handleInfoClick} /> */}
      {/*   ))} */}
      {/* </div> */}
      <JobPostings jobPostings={jobPostings} onToggleFavorite={toggleFavorite} onInfoClick={handleInfoClick} />
    </div>
  )
}
