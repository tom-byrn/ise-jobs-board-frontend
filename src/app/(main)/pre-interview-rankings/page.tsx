'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
  SortableContext as SortableContextType,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { env } from '@/env';
import { createBrowserClient } from '@supabase/ssr';
import { Session } from '@supabase/supabase-js';

// Types
interface JobPosting {
  id: string;
  job_title: string;
  salary: number;
  accommodation_support: boolean;
  position_count: number;
  location: string;
  company: {
    name: string;
    company_profile: {
      avatar: string;
    };
  };
}

interface SortableJobItemProps {
  job: JobPosting;
  rank: number;
}

// Drag handle component
function DragHandle() {
  return (
    <div className="flex flex-col gap-1 p-2 cursor-grab active:cursor-grabbing">
      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
    </div>
  );
}

// Sortable job item component
function SortableJobItem({ job, rank }: SortableJobItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: job.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border rounded-lg shadow-sm mb-3 ${
        isDragging ? 'opacity-50 shadow-lg' : ''
      }`}
    >
      <div className="flex items-center p-4">
        {/* Rank number */}
        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
          {rank}
        </div>
        
        {/* Company avatar */}
        <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg mr-4 overflow-hidden">
          {job.company?.company_profile?.avatar ? (
            <img 
              src={job.company.company_profile.avatar} 
              alt={job.company.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-xs">
              {job.company?.name?.charAt(0) || 'C'}
            </div>
          )}
        </div>

        {/* Job details */}
        <div className="flex-grow">
          <h3 className="font-semibold text-lg text-gray-800">{job.job_title}</h3>
          <p className="text-gray-600">{job.company?.name}</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span>💰 ${job.salary?.toLocaleString()}</span>
            <span>📍 {job.location}</span>
            <span>👥 {job.position_count} position{job.position_count !== 1 ? 's' : ''}</span>
            {job.accommodation_support && <span>🏠 Housing</span>}
          </div>
        </div>

        {/* Drag handle */}
        <div {...attributes} {...listeners} className="flex-shrink-0 ml-4">
          <DragHandle />
        </div>
      </div>
    </div>
  );
}

export default function JobRankingPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    async function fetchJobsAndAuth() {
      try {
        // Get auth session
        const supabase = createBrowserClient(
          env.NEXT_PUBLIC_SUPABASE_URL!,
          env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        
        const { data: { session }, error: authError } = await supabase.auth.getSession();
        if (authError) {
          console.error('Auth error:', authError);
          return;
        }
        
        setSession(session);

        if (!session) {
          console.error('No session found');
          return;
        }

        // Fetch job postings
        const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/job-postings`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch jobs: ${response.status}`);
        }

        const jobData = await response.json();
        setJobs(jobData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        alert('Failed to load job postings');
      } finally {
        setLoading(false);
      }
    }

    fetchJobsAndAuth();
  }, []);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setJobs((jobs) => {
        const oldIndex = jobs.findIndex((job) => job.id === active.id);
        const newIndex = jobs.findIndex((job) => job.id === over.id);

        return arrayMove(jobs, oldIndex, newIndex);
      });
    }
  }

  async function handleSubmit() {
    if (!session) {
      alert('You must be logged in to submit rankings');
      return;
    }

    setSubmitting(true);
    try {
      // Create ranking data - rank 1 is the top (first in array)
      const rankings = jobs.map((job, index) => ({
        job_posting_id: job.id,
        rank: index + 1, // 1-based ranking
      }));

      console.log('Submitting rankings:', rankings);

      // You'll need to implement this API endpoint
      const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/submit-rankings`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rankings }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit rankings: ${response.status}`);
      }

      alert('Rankings submitted successfully!');
      router.push('/dashboard'); // or wherever you want to redirect
    } catch (error) {
      console.error('Error submitting rankings:', error);
      alert('Failed to submit rankings');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="pt-24 px-6 max-w-4xl mx-auto">
        <div className="text-center">Loading job postings...</div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="pt-24 px-6 max-w-4xl mx-auto">
        <div className="text-center">Please log in to rank job postings.</div>
      </main>
    );
  }

  return (
    <main className="pt-24 px-6 max-w-4xl mx-auto pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Rank Job Postings</h1>
        <p className="text-gray-600">
          Drag and drop to rank the job postings in order of your preference. 
          Position 1 is your top choice.
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No job postings available to rank.</p>
        </div>
      ) : (
        <>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext items={jobs.map(job => job.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-0">
                {jobs.map((job, index) => (
                  <SortableJobItem
                    key={job.id}
                    job={job}
                    rank={index + 1}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <div className="mt-8 flex gap-4 justify-center">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Rankings'}
            </button>
            <button
              onClick={() => router.back()}
              className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </main>
  );
}