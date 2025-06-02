import React from "react"
import { getJobPostings } from "../../api/utils"
import ClientJobPostings from "@/components/job-posting/client-job-postings"
import { JobPosting } from "@/types/job-posting"

export default async function JobsBoard() {
  let jobPostings: JobPosting[] = []
  let error = null

  try {
    jobPostings = await getJobPostings()
    jobPostings.sort((a, b) => a.company.name.localeCompare(b.company.name))
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load job postings'
  }

  return (
    <div>
      <ClientJobPostings initialJobPostings={jobPostings} error={error} />
    </div>
  )
}
