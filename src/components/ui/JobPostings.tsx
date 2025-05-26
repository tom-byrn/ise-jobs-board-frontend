import { JobCard } from "./job-card";

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


interface JobCardProps {
  onToggleFavorite: (id: string) => void
  onInfoClick?: (job: JobPosting) => void

}

type JobPostingsProps = JobCardProps & {
  jobPostings: JobPosting[]
}

export default function JobPostings(props: JobPostingsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {props.jobPostings.map((job) => (
        <JobCard key={job.id} job={job} onToggleFavorite={props.onToggleFavorite} onInfoClick={props.onInfoClick} />
      ))}
    </div>
  )
}
