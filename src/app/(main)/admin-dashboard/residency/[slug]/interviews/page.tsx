import AnimatedHeroText from "@/components/animated-hero"
import { Play, Zap, Users, Calendar } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { fetchInterviews } from "@/app/api/utils"
import InterviewsTable from "../../../../../../components/admin/residency/tables/interviews-table"
import Link from "next/link"

const slugToYear: Record<string, string> = {
  "1": "1",
  "2": "1",
  "3": "2",
  "4": "3",
  "5": "4",
}

export default async function ResidencyInterviewsPage(
  { params }: { params: { slug: string } },
) {
  const { slug } = params
  const year = slugToYear[slug] ?? "0"


  const interviews = await fetchInterviews(year)
  return (
    <div className="flex w-full flex-col px-8 pt-12 md:pt-16">
      <div className="min-h-screen p-6">
        <div className="mx-auto max-w-7xl space-y-6">

          <AnimatedHeroText text={`Residency ${slug}`} emphasis={[10]} />

          <div className="flex gap-4">
            <Button
              asChild
              variant="outline"
            >
              <Link href={`/admin-dashboard/residency/${slug}`}>
                <Users className="mr-2 h-4 w-4" />
                Students
              </Link>
            </Button>

            <Button asChild variant="outline">
              <Link href={`/admin-dashboard/residency/${slug}/matching`}>
                <Users className=" h-4 w-4" />
                Final Matches
              </Link>
            </Button>
          </div>

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
        </div>
      </div>
    </div>
  )
}
