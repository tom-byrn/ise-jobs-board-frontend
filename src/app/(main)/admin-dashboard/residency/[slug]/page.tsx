
import * as React from "react"
import { Play, Zap, Calendar, Users } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import AnimatedHeroText from "@/components/animated-hero"
import StudentsTable from "./student-table"
import { fetchInterviews, fetchStudentsWithProfiles } from "@/app/api/utils"
import InterviewsTable from "./InterviewsTable"
import JobPostingTable from "./job-posting-table"
import { fetchJobPostingsByResidency } from "@/app/api/utils"
import Link from "next/link"

type StudentRow = {
  id: string
  name: string
  email: string
  gpa: number
  status: "Active" | "Pending"
  interviewScore: number
  preferences: string[]
}


export default async function ResidencyManager({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug: residencySlug } = await params
  let year: string = "0";



  switch (residencySlug) {
    case "1":
      year = "1"
      break;

    case "2":
      year = "1"
      break;
    case "3":
      year = "2"
      break;
    case "4":
      year = "3"
      break;
    case "5":
      year = "4"
      break;
    default:
      throw new Error(`Unknown slug`)
  }

  const students = await fetchStudentsWithProfiles(year)
  console.log("students array", students)
  const interviews = await fetchInterviews(year)
  console.log("interviews", interviews)
  const postings = await fetchJobPostingsByResidency(year)

  return (
    <div className="flex w-full flex-col px-8 pt-12 md:pt-16">
      <div className="min-h-screen p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <AnimatedHeroText text={`Residency ${residencySlug}`} emphasis={[10]} />

          {/* Nav buttons */}
          <div className="flex gap-4">
            <Button asChild variant="outline">
              <Link href={`/admin-dashboard/residency/${residencySlug}/interviews`}>
                <Calendar className="mr-2 h-4 w-4" />
                Interviews
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/admin-dashboard/residency/${residencySlug}/matching`}>
                <Users className=" h-4 w-4" />
                Final Matches
              </Link>
            </Button>
          </div>

          {/* Students table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Students</CardTitle>
                <div className="flex gap-3">
                  <Button variant="default">
                    <Play className="mr-2 h-4 w-4" />
                    Run Selection
                  </Button>
                  <Button variant="secondary">
                    <Zap className="mr-2 h-4 w-4" />
                    Run Match
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="rounded-md border">
                <StudentsTable students={students} />
              </div>
            </CardContent>


            <CardHeader>
              <CardTitle className="text-2xl">Job Postings </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <JobPostingTable postings={postings} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

