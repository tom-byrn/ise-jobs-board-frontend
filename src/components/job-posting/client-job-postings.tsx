"use client"

import React, { useState } from "react"
import JobPostings from "@/components/ui/JobPostings"
import { JobPosting } from "@/types/job-posting"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectTrigger, SelectValue } from "../ui/select"
import { SelectItem } from "@radix-ui/react-select"

interface Props {
  initialJobPostings: JobPosting[]
  error: string | null
}

export default function ClientJobPostings({ initialJobPostings, error }: Props) {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>(
    initialJobPostings.map(job => ({ ...job, isFavourited: false }))
  )

  const [locations, setLocations] = useState<string[]>(Array.from(
    new Set(jobPostings.map((job) => job.location))
  ))

  const [selectedLocation, setSelectedLocation] = useState<string>()

  const toggleFavourite = (id: string) => {
    setJobPostings(current =>
      current.map(job =>
        job.id === id
          ? { ...job, isFavourited: !job.isFavourited }
          : job
      )
    )
  }

  return (
    <div className="flex w-screen flex-col px-8 pt-16 md:pt-20">
      <div className="bg-white my-4 p-2 flex items-center gap-x-8 w-fit">
        <div>
          <Label htmlFor="search">Search</Label>
          <Input
            className="max-w-fit"
            id="search"
            onChangeCapture={e => {
              console.log(e.currentTarget.value)
              setJobPostings(
                initialJobPostings.filter(job => job.company.name.toLowerCase().includes(e.currentTarget.value.toLowerCase()))
              )
            }}
          />
        </div>

        <div>
          <Label htmlFor="search">Location</Label>
          <Select onValueChange={e => {
            setSelectedLocation(e)
            setJobPostings(initialJobPostings.filter(jp => jp.location === e))
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Choose...">
                {selectedLocation}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="hover:cursor-pointer">
              {locations.map(loc => (
                <SelectItem value={loc} key={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <JobPostings jobPostings={jobPostings} onToggleFavourite={toggleFavourite} />
    </div>
  )
}
