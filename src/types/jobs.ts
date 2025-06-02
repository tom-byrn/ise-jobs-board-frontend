export interface JobPosting {
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
