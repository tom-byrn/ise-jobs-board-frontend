import { env } from "@/env"
import { StudentJoinedWithProfile } from "@/types/student";
import Image from "next/image";
import { Suspense } from 'react';

const FallbackPage = () => {
	return (
		<div className="flex flex-col">
			<div className="flex flex-row items-end gap-x-8">
				<div className="h-64 w-64 animate-pulse rounded-full bg-black/20">
				</div>
				<div className="mb-8 flex flex-col py-2">
					<div className="h-16 mb-1 w-96 animate-pulse rounded-xl bg-black/20" />
					<div className="h-6 w-40 animate-pulse rounded-xl bg-black/20" />
				</div>
			</div>

			<h2 className="mt-8 bg-white text-2xl font-bold">Overview</h2>
			<div className="h-32 w-full animate-pulse rounded-xl bg-black/20" />

			<h2 className="mt-8 bg-white text-2xl font-bold">Projects</h2>
		</div>
	)
}

async function StudentDetails({ slug }: { slug: string }) {
	const fetchStudentURL = env.API_URL + "/students/profile/" + slug

	const resStudent = await fetch(fetchStudentURL);

	if (!resStudent.ok) {
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
				<Image
					className="rounded-full"
					src={studentData.student_profile.avatar_url}
					alt="Image of the student"
					height={256}
					width={256}
				/>
				<div className="mb-8 flex flex-col bg-white py-2">
					<h1 className="text-7xl">{studentData.name}</h1>
					<h2 className="-mt-2 text-xl">{studentData.year} | {studentData.student_profile.pronouns}</h2>
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
