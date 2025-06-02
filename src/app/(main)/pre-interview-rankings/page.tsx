// File: app/(main)/pre-interview-rankings/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { getJobPostings } from "@/app/api/utils";
import { JobPosting } from "@/types/jobs";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"; 
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"; 
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"; 
import { JobRankingItem } from "@/components/rankings/job-ranking-item";

export default function PreInterviewRankingsPage() {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const fetched = (await getJobPostings()) as JobPosting[];
        setJobPostings(fetched.map((j) => ({ ...j, isFavourited: false })));
      } catch (err) {
        console.error("getJobPostings failed:", err);
      }
    })();
  }, []);

  //PointerSensor with a 5px activation distance
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;
    if (activeId !== overId) {
      const oldIndex = jobPostings.findIndex((j) => j.id === activeId);
      const newIndex = jobPostings.findIndex((j) => j.id === overId);
      const newOrder = arrayMove(jobPostings, oldIndex, newIndex);
      setJobPostings(newOrder);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Rank Job Postings</h1>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={jobPostings.map((job) => job.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="space-y-2">
            {jobPostings.map((job) => (
              <JobRankingItem key={job.id} job={job} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}
