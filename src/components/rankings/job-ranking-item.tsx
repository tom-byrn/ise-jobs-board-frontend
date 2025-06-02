"use client";

import React from "react";
import {
  useSortable,
  defaultAnimateLayoutChanges,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";                       
import { JobPosting } from "@/types/jobs";

interface SortableJobItemProps {
  job: JobPosting;
}

export function JobRankingItem({ job }: SortableJobItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: job.id,
    animateLayoutChanges: (args) =>
      defaultAnimateLayoutChanges({ ...args, wasDragging: true }),
  });                                                                        

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    display: "flex",
    alignItems: "center",
    padding: "0.75rem",
    backgroundColor: "#fff",
    borderRadius: "0.5rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    cursor: "default",
  };

  return (
    <li ref={setNodeRef} style={style} role="listitem">
      <button
        ref={setActivatorNodeRef}
        {...listeners}
        {...attributes}
        className="mr-4 cursor-grab text-gray-500"
        aria-label="Drag handle"
      >
        ☰
      </button>
      <div>
        <div className="font-medium">{job.job_title}</div>
        <div className="text-sm text-gray-600">
          {job.company.name} — {job.location}
        </div>
      </div>
    </li>
  );
}
