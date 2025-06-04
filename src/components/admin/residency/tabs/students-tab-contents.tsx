import { Play, Zap } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CompanyWithPostings, StudentWithProfile } from "@/app/api/utils"
import StudentsTable from "../tables/student-table"
import JobPostingTable from "../tables/job-posting-table"

export function StudentsTabContents({ students, postings }: { students: StudentWithProfile[], postings: CompanyWithPostings[] }) {
  return (
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
  )
}
