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
  BellRing
} from "lucide-react";
import { AdminCalendar } from "@/components/admin/admin-calendar";


export default function Home() {
  return (
    <div className="flex w-screen flex-col px-8 pt-12 md:pt-16">
      <AnimatedHeroText text="Admin Dashboard" emphasis={[0, 1, 2, 3, 4]} />

      <h2 className="w-3/4 mt-3 font-mono text-gray-800 lg:pt-0 dark:text-neutral-300">
        Welcome to the Immersive Software Engineering Admin Portal
      </h2>

      <div className="pt-10 px-5">
        <AdminCalendar />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-10 mb-10">
        {/* Residencies Panel */}
        <div className="flex flex-col justify-between w-full bg-black p-6 text-white dark:bg-white dark:text-black shadow">
          <h2 className="pb-3 text-3xl">Residencies</h2>
          <p className="text-neutral-300 dark:text-neutral-700">
            Manage residency partners, reminders, and dashboards.
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            <FloatingLink href="/send-reminder-rps">
              <BellRing size={18} />
              Send Reminder to RPs
            </FloatingLink>
            <FloatingLink href="/onboard-rp">
              <UserPlus size={18} />
              Onboard New RP
            </FloatingLink>
            <FloatingLink href="/rp-dashboard">
              <LayoutDashboard size={18} />
              RP Dashboard
            </FloatingLink>
          </div>
        </div>

        {/* Students Panel */}
        <div className="flex flex-col justify-between w-full bg-black p-6 text-white dark:bg-white dark:text-black shadow">
          <h2 className="pb-3 text-3xl">Students</h2>
          <p className="text-neutral-300 dark:text-neutral-700">
            Manage student profiles, dashboards, and reminders.
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            <FloatingLink href="/send-reminder-students">
              <BellRing size={18} />
              Send Reminder to Students
            </FloatingLink>
            <FloatingLink href="/add-student">
              <UserPlus size={18} />
              Add New Students
            </FloatingLink>
            <FloatingLink href="/students-dashboard">
              <LayoutDashboard size={18} />
              Students Dashboard
            </FloatingLink>
          </div>
        </div>
      </div>
    </div>
  );
}
