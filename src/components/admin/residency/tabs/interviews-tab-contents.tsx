import { Play, Zap } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { InterviewTableProps } from "@/app/api/utils"
import InterviewsTable from "../tables/interviews-table"

export default function InterviewsTabContents({ interviews }: { interviews: InterviewTableProps }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Interviews</CardTitle>

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
          <InterviewsTable data={interviews.students ?? []} />
        </div>
      </CardContent>
    </Card>
  )
}
