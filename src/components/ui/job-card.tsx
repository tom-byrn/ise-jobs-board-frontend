"use client"

import { Heart, Users, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface JobPosting {
  id: string;
  job_title: string;
  salary: string;
  accommodation_support: string;
  position_count: number;
  location: string;
  company: {
    name: string;
    company_profile: {
      avatar: string;
    };
  };
  isFavourited: boolean;
}

interface JobCardProps {
  job: JobPosting
  onToggleFavorite: (id: string) => void
  onInfoClick?: (job: JobPosting) => void
}

export function JobCard({ job, onToggleFavorite, onInfoClick }: JobCardProps) {
  return (
    <Card className="relative bg-black border border-gray-200 hover:shadow-lg transition-shadow dark:bg-white">
      <CardContent className="p-6">
        {/* Favorite Button */}
        <button onClick={() => onToggleFavorite(job.id)} className="absolute top-4 right-4 p-1">
          <Heart className={`w-5 h-5 ${job.isFavourited ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"}`}
          />
        </button>

        {/* Company Logo and Info */}
        <div className="flex items-start space-x-3 mb-4">
          <img
            src={job.company.company_profile.avatar || "/placeholder.svg"}
            alt={`${job.company.name} logo`}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-white dark:text-gray-900  ">{job.company.name}</h3>
            <p className="text-sm text-white dark:text-gray-600">{job.job_title}</p>
          </div>
        </div>

        {/* Job Details */}
        <div className="space-y-2 mb-4">
          <p className="text-sm text-white dark:text-gray-600">
            <span className="font-medium">Location:</span> {job.location}
          </p>
          <p className="text-sm text-white dark:text-gray-600">
            <span className="font-medium">Salary:</span> {job.salary}
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-sm  text-white font-medium dark:text-gray-600">Accommodation Support:</span>
            <span className={`text-sm font-bold ${job.accommodation_support ? "text-green-600" : "text-red-600"}`}>
              {job.accommodation_support ? "✓" : "✗"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button size="sm" className="flex items-center space-x-1 bg-green-600 hover:bg-green-700">
            <Users className="w-4 h-4" />
            <span>{job.position_count} positions</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex items-center space-x-1"
            onClick={() => onInfoClick?.(job)}
          >
            <Info className="w-4 h-4" />
            <span>Info</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
