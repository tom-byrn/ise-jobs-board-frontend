import { WickedLink } from "@/components/student-profile/link";
import { SuspensedImage } from "@/components/student-profile/suspensed-image";
import { env } from "@/env"
import { StudentJoinedWithProfile } from "@/types/student";
import { FileText, Github, Globe, Linkedin } from "lucide-react";
import { Suspense } from 'react';



const FallbackPage = () => {
	return (
		<div className="flex flex-col">
			<div className="flex flex-row items-end gap-x-8">
				<div className="h-64 w-64 animate-pulse rounded-full bg-muted">
				</div>
				<div className="mb-8 flex flex-col py-2">
					<div className="mb-1 h-16 w-96 animate-pulse rounded-xl bg-muted" />
					<div className="h-6 w-40 animate-pulse rounded-xl bg-muted" />
				</div>
			</div>

			<h2 className="mt-8 bg-white text-2xl font-bold">Overview</h2>
			<div className="h-32 w-full animate-pulse rounded-xl bg-muted" />

			<h2 className="mt-8 bg-white text-2xl font-bold">Projects</h2>
		</div>
	)
}

async function StudentDetails({ slug }: { slug: string }) {
	const fetchStudentURL = env.API_URL + "/students/profile/" + slug

	const resStudent = await fetch(fetchStudentURL);

	if (!resStudent.ok) {
		console.log(resStudent)
		return (
			<h1>FUCKING ERROR!! :(</h1>
		)
	}

	// Parse the JSON response
	const studentData: StudentJoinedWithProfile = await resStudent.json();

	console.log(studentData)

	return (
		<div className="flex flex-col">
			<div className="flex flex-row items-end gap-x-8">
				<SuspensedImage imageURL={studentData.student_profile.avatar_url} />
				<div className="flex flex-col bg-white py-2">
					<h1 className="text-7xl">{studentData.name}</h1>
					<h2 className="-mt-2 text-xl">{studentData.year} | {studentData.student_profile.pronouns}</h2>
					<div className="mt-3 flex flex-row gap-x-4">
						<WickedLink text="CV.pdf" url={studentData.student_profile.cv_url} icon={<FileText size={20} />} />
						<WickedLink text="GitHub" url={studentData.student_profile.github_link} icon={<Github size={20} />} />
						<WickedLink text="LinkedIn" url={studentData.student_profile.linkedin_link} icon={<Linkedin size={20} />} />
						<WickedLink text="Personal Site" url={studentData.student_profile.personal_site_link} icon={<Globe size={20} />} />
					</div>
				</div>
			</div>

			<h2 className="mt-8 bg-white text-2xl font-bold">Overview</h2>
			<p className="whitespace-pre-line bg-white p-2">
				{studentData.student_profile.description}
			</p>

			<h2 className="mt-8 bg-white text-2xl font-bold">Projects</h2>
		</div>
	)
}

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params

	return (
		<div className="flex w-screen flex-col pl-20 pr-64 pt-16 md:pt-32">
			<Suspense fallback={<FallbackPage />}>
				<StudentDetails slug={slug} />
			</Suspense>
		</div>
	)
}
