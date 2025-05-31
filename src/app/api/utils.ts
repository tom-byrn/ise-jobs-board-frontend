
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
}

export interface NewCompanyProfileDTO {
  subtitle: string
  avatar: string
  banner_image: string
  description: string
}

export interface NewCompanyDTO {
  name: string
  profile: NewCompanyProfileDTO
}

// the shape your backend returns
export interface Company {
  id: string
  name: string
  company_profile: string
}

export async function getJobPostings(): Promise<JobPosting[]> {
  const res = await fetch('http://localhost:8080/api/v1/job-postings', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  }

  return (await res.json()) as JobPosting[]
}

export async function createCompany(
  dto: NewCompanyDTO
): Promise<Company> {
  const res = await fetch('http://localhost:8080/api/v1/residency', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`HTTP ${res.status}: ${res.statusText} — ${text}`)
  }

  return (await res.json()) as Company
}
