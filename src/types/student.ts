import { z } from 'zod';

export const StudentSchema = z.object({
	id: z.string(),
	name: z.string(),
	student_profile_id: z.string(),
});

export const StudentProfileSchema = z.object({
	id: z.string(),
	qca: z.number(),
	pronouns: z.string(),
	description: z.string(),
	avatar_url: z.string(),
});

export type Student = z.infer<typeof StudentSchema>;
export type StudentProfile = z.infer<typeof StudentProfileSchema>;
