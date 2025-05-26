
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

export default async function getJobPostings(): Promise<JobPosting[]> {
  try {
    const url: string = "http://0.0.0.0:8080/api/v1/job-postings"
    const res = await fetch(url,
      {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      }
    )
    const data: JobPosting[] = await res.json();

    return data;

  } catch (err) {
    console.error("Get Job Postings failed", err)
    throw err;
  }
}
