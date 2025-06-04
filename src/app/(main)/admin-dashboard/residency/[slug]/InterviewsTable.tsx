"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"

export interface InterviewWithStudent {
  id: number
  student_id: string
  job_posting_id: string
  student: { id: string; name: string; year: number }
  job_posting: { id: string; job_title: string }
}

const columns: ColumnDef<InterviewWithStudent>[] = [
  {
    header: "Student",
    accessorFn: row => row.student.name,          // ✅ nested value
    cell: info => <span className="font-medium">{info.getValue<string>()}</span>,
  },
  {
    header: "Year",
    accessorFn: row => row.student.year,          // ✅ nested value
    enableSorting: false,
  },
  {
    header: "Posting",
    accessorFn: row => row.job_posting.job_title, // ✅ nested value
  },
  {
    header: "Interview ID",
    accessorKey: "id",                            // top-level — accessorKey OK
  },
]

export default function InterviewsTable({ data }: { data: InterviewWithStudent[] }) {
  return <DataTable columns={columns} data={data} />
}
