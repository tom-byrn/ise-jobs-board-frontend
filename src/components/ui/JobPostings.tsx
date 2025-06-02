import { JobPosting } from "@/types/job-posting";
import { JobCard } from "./job-card";

interface JobCardProps {
  onToggleFavourite: (id: string) => void
}

type JobPostingsProps = JobCardProps & {
  jobPostings: JobPosting[]
}

export default function JobPostings(props: JobPostingsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {props.jobPostings.map((job) => (
        <JobCard key={job.id} job={job} onToggleFavourite={props.onToggleFavourite} />
      ))}
    </div>
  )
}
