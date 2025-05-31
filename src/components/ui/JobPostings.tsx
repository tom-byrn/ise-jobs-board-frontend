import { JobCard } from "./job-card";


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
