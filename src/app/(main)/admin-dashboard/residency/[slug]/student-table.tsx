"use client"

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

type StudentRow = {
  id: string
  name: string
  email: string
  gpa: number
  status: "Active" | "Pending"
  interviewScore: number
  preferences: string[]
}

export default function StudentsTable({ students }: { students: StudentRow[] }) {

  return (
    < Table >
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>GPA</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Interview&nbsp;Score</TableHead>
          <TableHead>Top&nbsp;Preferences</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {students.map((s) => (
          <TableRow key={s.id}>
            <TableCell className="font-medium">{s.name}</TableCell>
            <TableCell className="text-gray-600">{s.email}</TableCell>
            <TableCell>{s.gpa.toFixed(2)}</TableCell>
            <TableCell>
              <Badge
                variant={s.status === "Active" ? "default" : "secondary"}
              >
                {s.status}
              </Badge>
            </TableCell>
            <TableCell>{s.interviewScore}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {s.preferences.slice(0, 2).map((p) => (
                  <Badge key={p} variant="outline" className="text-xs">
                    {p}
                  </Badge>
                ))}
              </div>
            </TableCell>
          </TableRow>
        ))}

        {students.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="py-8 text-center">
              No mock students for this residency&nbsp;yet.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table >
  )
}
