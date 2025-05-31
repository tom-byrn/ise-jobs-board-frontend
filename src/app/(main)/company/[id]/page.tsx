import LoadingSpinner from "@/components/loading-spinner";
import { EditProfileForm } from "@/components/student-profile/edit-profile";
import { WickedLink } from "@/components/student-profile/link";
import { SuspensedImage } from "@/components/student-profile/suspensed-image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@/lib/server";
import { CompanyJoinedWithProfile } from "@/types/company";
import { FileText, Github, Globe, Linkedin, Pencil } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {

  const { id } = await params;

  try {
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const token = session?.access_token;
    const url = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${url}/company/profile/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.warn("metadata fetch failed:", res.status, await res.text());
      throw new Error("Company not found");
    }

    const company: CompanyJoinedWithProfile = await res.json();

    return {
      title: `${company.name}`,
      description: `View ${company.name}'s company information.`,
    };
  } catch (e) {
    console.error("Error fetching company data for metadata:", e);
    return {
      title: "Company Profile",
      description: "Company profile page",
    };
  }
}

const FallbackPage = () => {
  return (
    <LoadingSpinner />
  );
};

async function CompanyDetails({ id }: { id: string }) {
  // fetch with auth
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;
  const url = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${url}/company/profile/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 404) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Company not found</p>
      </div>
    );
  }
  if (!res.ok) {
    throw new Error(`Unexpected error: ${res.status}`);
  }

  const company: CompanyJoinedWithProfile =  await res.json();

  return (
    <div className="flex w-screen flex-col px-8 pt-16 md:px-16 md:pt-32 xl:pl-20 xl:pr-40 2xl:pr-64">
      <div className="flex flex-col items-center gap-x-8 lg:flex-row lg:items-end">
        <SuspensedImage imageURL={company.company_profile.avatar} />
        <div className="flex flex-col bg-white dark:bg-black py-2">
          <h1 className="text-6xl md:text-7xl">{company.name}</h1>
          <span className="flex flex-row -mt-2 text-xl">
            <h2 className="">
              {company.company_profile.subtitle} | {company.company_profile.description} |{" "}
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex flex-row items-center gap-x-1 ml-3">
                  Edit <Pencil size={18} className="mb-1" />
                </button>
              </DialogTrigger>
              <DialogContent className="overflow-scroll h-3/4">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you’re
                    done.
                  </DialogDescription>
                </DialogHeader>
                {/*}<EditProfileForm currentValues={company} />{*/}
              </DialogContent>
            </Dialog>
          </span>
        </div>
      </div>

      <div className="mt-8 border-2 border-black bg-white dark:bg-black dark:border-white p-2 rounded-sm">
        <h2 className="text-2xl font-bold">Overview</h2>
        <p className="whitespace-pre-line text-sm md:text-base">
          {company.company_profile.description}
        </p>
      </div>
    </div>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  return (
    <Suspense fallback={<FallbackPage />}>
      <CompanyDetails id={id} />
    </Suspense>
  );
}
