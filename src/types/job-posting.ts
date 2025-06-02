export interface JobPosting {
	id: string;
	job_title: string;
	salary: string;
	accommodation_support: string;
	description: string;
	contact_email: string;
	location: string;
	position_count: number;
	residency: number;
	company: {
		id: string;
		name: string;
		company_profile: {
			avatar: string;
		};
	};
	isFavourited: boolean;
}
