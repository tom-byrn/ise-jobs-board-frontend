import { EditProfileForm } from "@/components/student-profile/edit-profile";
import { WickedLink } from "@/components/student-profile/link";
import { SuspensedImage } from "@/components/student-profile/suspensed-image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { createClient } from "@/lib/server";
import { StudentJoinedWithProfile } from "@/types/student";
import { FileText, Github, Globe, Linkedin, Pencil } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from 'react';

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;

	try {
		const supabase = await createClient();
		const studentReq = await supabase
			.from("student")
			.select("*, student_profile:student_profile_id(*)")
			.eq("id", slug);

		if (studentReq.status === 200 && studentReq.data && studentReq.data[0]) {
			const studentData: StudentJoinedWithProfile = studentReq.data[0];
			return {
				title: `${studentData.name} - Student Profile`,
				description: `View ${studentData.name}'s profile, projects, and information.`,
			};
		}
	} catch (error) {
		console.error("Error fetching student data for metadata:", error);
	}

	// Fallback
	return {
		title: "Student Profile",
		description: "Student profile page",
	};
}

const FallbackPage = () => {
	return (
		<div className="flex w-screen flex-col px-8 pt-16 md:px-16 md:pt-32 xl:pl-20 xl:pr-40 2xl:pr-64">
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
		</div>
	)
}

async function StudentDetails({ slug }: { slug: string }) {
	const supabase = await createClient()
	const studentReq = await supabase
		.from("student")
		.select("*, student_profile:student_profile_id(*)")
		.eq("id", slug)

	if (studentReq.status != 200 || studentReq.data == null || studentReq.data[0] == null) {
		return (
			<div className="flex h-screen w-screen items-center justify-center">
				<div className="bg-white flex flex-col items-center p-8">
					student not found
					<a className="p-2 mt-4 bg-black text-white dark:bg-white dark:text-black" href="/">
						return home
					</a>
				</div>
			</div>
		)
	}

	// Parse the JSON response
	const studentData: StudentJoinedWithProfile = studentReq.data[0];

	return (
		<div className="flex w-screen flex-col px-8 pt-16 md:px-16 md:pt-32 xl:pl-20 xl:pr-40 2xl:pr-64">
			<div className="flex flex-col items-center gap-x-8 lg:flex-row lg:items-end">
				<SuspensedImage imageURL={studentData.student_profile.avatar_url} />
				<div className="flex flex-col bg-white py-2">
					<h1 className="text-6xl md:text-7xl">{studentData.name}</h1>
					<span className="flex flex-row -mt-2 text-xl">
						<h2 className="">{studentData.year} | {studentData.student_profile.pronouns} | </h2>
						<Dialog>
							<DialogTrigger asChild>
								<button className="flex flex-row items-center gap-x-1 ml-3">
									Edit <Pencil size={18} className="mb-1" />
								</button>
							</DialogTrigger>
							<DialogContent className="overflow-scroll h-3/4">
								<DialogHeader>
									<DialogTitle>Edit profile</DialogTitle>
									<DialogDescription>
										Make changes to your profile here. Click save when you're done.
									</DialogDescription>
								</DialogHeader>
								<EditProfileForm currentValues={studentData} />
							</DialogContent>
						</Dialog>
					</span>
					<div className="mt-3 flex flex-col gap-x-4 gap-y-2 sm:flex-row">
						<WickedLink text="CV.pdf" url={studentData.student_profile.cv_url} icon={<FileText size={20} />} />
						<WickedLink text="GitHub" url={studentData.student_profile.github_link} icon={<Github size={20} />} />
						<WickedLink text="LinkedIn" url={studentData.student_profile.linkedin_link} icon={<Linkedin size={20} />} />
						<WickedLink text="Personal Site" url={studentData.student_profile.personal_site_link} icon={<Globe size={20} />} />
					</div>
				</div>
			</div>

			<div className="mt-8 border-2 border-black bg-white p-2 rounded-sm">
				<h2 className="text-2xl font-bold">Overview</h2>
				<p className="whitespace-pre-line text-sm md:text-base">
					{studentData.student_profile.description}
				</p>
			</div>

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
		<Suspense fallback={<FallbackPage />}>
			<StudentDetails slug={slug} />
		</Suspense>
	)
}
