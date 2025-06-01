// src/components/navbar/dashboard-link.tsx
import { createClient } from "@/lib/server";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import Link from "next/link";
import { env } from "@/env";

export async function DashboardLink() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return null;
  }
  const userID = user.id;

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (sessionError || !session) {
    return null;
  }
  const token = session.access_token;

  const url = env.NEXT_PUBLIC_API_URL;
  let role: string | null = null;

  try {
    const res = await fetch(`${url}/account/role/${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.warn("role fetch failed:", res.status, await res.text());
      return null;
    }
    const { role: fetchedRole } = (await res.json()) as { role?: string };
    if (typeof fetchedRole !== "string") {
      return null;
    }
    role = fetchedRole;
  } catch {
    return null;
  }

  if (role === "admin") {
    return (
      <NavigationMenuItem>
        <Link href="/admin-dashboard" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Admin Dashboard
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    );
  } else if (role === "company") {
    return (
      <NavigationMenuItem>
        <Link href={`/company/${userID}`} legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Your Company Profile
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    );
  } else if (role === "student") {
    return (
      <NavigationMenuItem>
        <Link href={`/student/${userID}`} legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Your Profile
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    );
  }

  return null;
}
