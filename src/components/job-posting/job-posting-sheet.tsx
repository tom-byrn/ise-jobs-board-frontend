import { JobPosting } from "@/types/job-posting"
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Badge } from "../ui/badge";
import { BriefcaseBusiness, HandCoins, Heart, House, MapPin, Pin, User, Users } from "lucide-react";
import Image from "next/image";

interface JobSheetProps {
  job: JobPosting
  onToggleFavourite: (id: string) => void
}

export const JobPostingSheetContents = ({ job, onToggleFavourite }: JobSheetProps) => {
  return (
    <SheetContent className="w-[9999px] max-w-full sm:!max-w-[600px]" side="right">
      <div className="mt-8 flex flex-row justify-between">
        <div>
          <div className="flex flex-row items-center space-x-2">
            <Image
              src={job.company.company_profile.avatar || "/placeholder.svg"}
              alt={`${job.company.name} logo`}
              className="w-12 h-12 rounded-lg object-cover"
              width={48}
              height={48}
            />
            <h1 className="text-3xl font-bold">{job.company.name}</h1>
          </div>
          <h2 className="text-lg mt-1">{job.job_title}</h2>

          <div className="w-full mb-4 mt-2 h-[2px] dark:bg-white/20 bg-black/20" />

          <div className="flex flex-col space-y-2">
            <span className="flex flex-row items-center text-sm">
              <BriefcaseBusiness size={18} className="mr-2" /> Residency {job.residency}
            </span>

            <span className="flex flex-row items-center text-sm">
              <Users size={18} className="mr-2" /> {job.position_count} positions
            </span>

            <span className="flex flex-row items-center text-sm">
              <MapPin size={18} className="mr-2" /> {job.location}
            </span>

            <span className="flex flex-row text-sm">
              <HandCoins size={18} className="mr-2" /> {job.salary} per month
            </span>

            <span className="flex flex-row text-sm">
              <House size={18} className="mr-2" />

              Accommodation Support?
              <span className={`${job.accommodation_support ? "text-green-600" : "text-red-600"} ml-2 text-sm font-bold`}>
                {job.accommodation_support ? "Yes" : "No"}
              </span>
            </span>

            <span className="flex flex-row text-sm">
              <User size={18} className="mr-2" />
              Contact: {job.contact_email}
            </span>
          </div>
        </div>

        <div>
          <button
            className={`
                    ${job.isFavourited ? "bg-red-500 text-white" : "bg-transparent outline-red-500"} group mt-2 flex w-full
                    flex-row items-center gap-x-2 rounded-sm p-2 text-xs font-bold text-red-500 outline outline-2
                    `}
            onClick={() => onToggleFavourite(job.id)}
          >
            <Heart className={`${job.isFavourited ? "fill-white" : "text-gray-400 group-hover:text-red-500"} h-4 w-4`} />
            Favourite
          </button>
        </div>
      </div>

      <div className="w-full my-4 h-[3px] dark:bg-white/20 bg-black/20" />

      <p className="whitespace-pre-line px-4 font-sans">
        {job.description}
      </p>
    </SheetContent>
  )
}
