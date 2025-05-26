import { env } from "@/env"
import { StudentJoinedWithProfile } from "@/types/student";
import { Suspense } from 'react';

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
		<div className="bg-white w-fit p-4 border-2 border-black">
			<h1>Slug: {slug}</h1>
			<h1>Student name: {studentData.name}</h1>
			<h1>Student profile ID: {studentData.student_profile_id}</h1>
			<h1>Student QCA: {studentData.student_profile.qca}</h1>
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
		<div className="flex w-screen flex-col px-8 pt-16 md:pt-20">
			<Suspense fallback={<div>Loading...</div>}>
				<StudentDetails slug={slug} />
			</Suspense>
		</div>
	)
}
