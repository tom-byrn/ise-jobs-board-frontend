

"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { FinalMatchRow } from "@/app/api/utils"

export interface InterviewWithStudent {
  id: number
  student_id: string
  job_posting_id: string
  student: { id: string; name: string; year: number }
  job_posting: { id: string; job_title: string }
}

const columns: ColumnDef<FinalMatchRow>[] = [
  {
    header: "Student",
    accessorFn: row => row.student.name,
    cell: info => <span className="font-medium">{info.getValue<string>()}</span>,
  },
  {
    header: "Job Title",
    accessorFn: row => row.job_posting.job_title,
    enableSorting: false,
  },
  {
    header: "Residency",
    accessorFn: row => row.job_posting.residency,
  },
  {
    header: "Residency Email",
    accessorFn: row => row.job_posting.contact_email,
  },
]

export default function FinalMatchTable({ data }: { data: FinalMatchRow[] }) {
  return <DataTable columns={columns} data={data} />
}
