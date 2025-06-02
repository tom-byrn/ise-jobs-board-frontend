import LoadingSpinner from "@/components/loading-spinner";
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
import { Pencil } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
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
      return {
        title: "404 - ISE Jobs Board",
        description: "Company not found!",
      }
    }

    const company: CompanyJoinedWithProfile = await res.json();

    return {
      title: `${company.name} - ISE Jobs Board`,
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

  if (!res.ok) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center bg-white p-8">
          <p>company not found</p>
          <Link className="bg-black p-3 text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 mt-2" href="/">
            return home
          </Link>
        </div>
      </div>
    );
  }

  const company: CompanyJoinedWithProfile = await res.json();

  return (
    <div className="flex w-screen flex-col px-8 pt-16 md:px-16 md:pt-32 xl:pl-20 xl:pr-40 2xl:pr-64">
      <div className="relative">
        <img
          className="w-full h-56"
          src={company.company_profile.banner_image}
        />
        <img
          className="max-w-32 max-h-32 -bottom-12 left-12 outline outline-white dark:outline-black outline-8 absolute"
          src={company.company_profile.avatar}
        />
        <h1 className="absolute text-6xl bg-white md:text-7xl left-[11.5rem] -bottom-10 pt-10 px-6 dark:bg-black p-4">{company.name}</h1>
      </div>

      <div className="flex px-12 w-fit flex-col bg-white py-2 dark:bg-black mt-16">
        <span className="-mt-2 flex flex-row text-xl">
          <h2 className="">
            {company.company_profile.subtitle}
          </h2>
        </span>
      </div>

      <div className="mt-8 mx-12 border-2 border-black bg-neutral-100/90 p-2 dark:border-white dark:bg-black">
        <h2 className="text-2xl font-bold">Overview</h2>
        <p className="whitespace-pre-line font-sans text-sm md:text-base">
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
