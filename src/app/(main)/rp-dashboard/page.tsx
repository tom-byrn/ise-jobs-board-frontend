import AnimatedHeroText from "@/components/animated-hero";
import { FloatingLink } from "@/components/home/floating-link";
import {
  BriefcaseBusiness,
  LayoutDashboard,
  LayoutList,
  ListOrdered,
  UserPen,
  Users,
  MailPlus,
  UserPlus,
  BellRing,
  GitCompare,
  Users2,
  CirclePlus,
  SquarePen
} from "lucide-react";
import { AdminCalendar } from "@/components/admin/admin-calendar";
import UpcomingDeadlines from "@/components/admin/upcoming-deadlines";
import { getCompanyIdFromUserId, getUserId } from "@/app/api/user";

export default async function RPDashboard() {

    const userId = await getUserId()
    let profileUrl: string
    if(!userId){ 
        throw new Error("User not found")
    } else {
        try{
            const companyId = await getCompanyIdFromUserId(userId)
            profileUrl = ("/company/" + companyId)   
        } catch(error) {
            throw new Error("Company id not found")
        }
    } 
    

  return (
    <div className="flex w-full flex-col px-8 pt-12 md:pt-16">
      <AnimatedHeroText text="Residency Partner Dashboard" emphasis={[0, 1, 2, 3, 4, 5, 6, 7, 8]} />

      <h2 className="w-3/4 mt-3 font-mono text-gray-800 lg:pt-0 dark:text-neutral-300">
        Welcome to the Immersive Software Engineering Residency Partner Portal.
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-10 mb-10">
        {/* Residencies Panel */}
        <div className="flex flex-col justify-between w-full bg-black p-6 text-white dark:bg-white dark:text-black shadow">
          <h2 className="pb-3 text-3xl">My Company</h2>
          <p className="text-neutral-300 dark:text-neutral-700">
            Manage your company profile and rank residency candidates.
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            <FloatingLink href={profileUrl}>
              <LayoutDashboard size={18} />
                Company Profile
            </FloatingLink>
            <FloatingLink href="/admin-dashboard/rp-dashboard">
              <Users2 size={18} />
                Rank Students
            </FloatingLink>
          </div>
        </div>

        {/* Students Panel */}
        <div className="flex flex-col justify-between w-full bg-black p-6 text-white dark:bg-white dark:text-black shadow">
          <h2 className="pb-3 text-3xl">Job Postings</h2>
          <p className="text-neutral-300 dark:text-neutral-700">
            Create new job postings and manage existing job postings.
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            <FloatingLink href="/rp-dashboard/new-job-posting">
              <CirclePlus size={18} />
              Add New Job Posting
            </FloatingLink>
            <FloatingLink href="/students-dashboard">
              <SquarePen size={18} />
              Edit Job Postings
            </FloatingLink>
          </div>
        </div>
      </div>

    </div>
  );
}
