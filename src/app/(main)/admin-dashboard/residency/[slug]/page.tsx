/*  app/admin-dashboard/residency/[slug]/page.mock.tsx
    ------------------------------------------------------------------
    Temporary mock page for rapid UI work – remove once the real API
    is stable. Switch between the mock and the real page by commenting
    / uncommenting the export at the bottom of this file.
*/

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
// -------------------------------------------------------------------
// 1) Mock helpers
// -------------------------------------------------------------------

type StudentRow = {
  id: string
  name: string
  email: string
  gpa: number
  status: "Active" | "Pending"
  interviewScore: number
  preferences: string[]
}

const mockStudents: Record<string, StudentRow[]> = {
  /* ── Residency 2 (Year 2) ── */
  "2": [
    {
      id: "s1",
      name: "Alice Alpha",
      email: "alice.alpha@demo.io",
      gpa: 3.82,
      status: "Active",
      interviewScore: 88,
      preferences: ["Cloud", "Fintech"],
    },
    {
      id: "s2",
      name: "Bob Beta",
      email: "bob.beta@demo.io",
      gpa: 3.74,
      status: "Active",
      interviewScore: 80,
      preferences: ["Security", "Platform"],
    },
  ],

  /* ── Residency 3 (Year 2) ── */
  "3": [
    {
      id: "s3",
      name: "Charlie Gamma",
      email: "charlie.gamma@demo.io",
      gpa: 3.9,
      status: "Active",
      interviewScore: 91,
      preferences: ["Backend", "Cloud"],
    },
  ],

  /* ── Residency 4 (Year 3) ── */
  "4": [
    {
      id: "s4",
      name: "Dana Delta",
      email: "dana.delta@demo.io",
      gpa: 3.67,
      status: "Pending",
      interviewScore: 76,
      preferences: ["ML", "Data"],
    },
    {
      id: "s5",
      name: "Evan Epsilon",
      email: "evan.epsilon@demo.io",
      gpa: 3.93,
      status: "Active",
      interviewScore: 95,
      preferences: ["Payments", "Fintech"],
    },
  ],

  /* ── Residency 5 (Year 4) ── */
  "5": [
    {
      id: "s6",
      name: "Fiona Zeta",
      email: "fiona.zeta@demo.io",
      gpa: 3.85,
      status: "Active",
      interviewScore: 89,
      preferences: ["Frontend", "Mobile"],
    },
  ],
}

// -------------------------------------------------------------------
// 2) Component
// -------------------------------------------------------------------

export default async function ResidencyManager({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug: residencySlug } = await params
  const students = mockStudents[residencySlug] ?? []

  return (
    <div className="flex w-full flex-col px-8 pt-12 md:pt-16">
      <div className="min-h-screen p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <AnimatedHeroText text={`Residency ${residencySlug}`} emphasis={[10]} />
          {/* Page header */}

          {/* Nav buttons */}
          <div className="flex gap-4">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Interviews
            </Button>
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Final Matches
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
          </Card>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------
   QUICK SWITCH

   1. While prototyping:
      export default ResidencyManagerMock

   2. Once the real API page is ready:
      export { default } from "./page"   // (or whatever your real file is)
------------------------------------------------------------------- */
