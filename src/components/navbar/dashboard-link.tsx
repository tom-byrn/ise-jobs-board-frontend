import { createClient } from "@/lib/server";
import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "../ui/navigation-menu";
import Link from "next/link";
import { env } from "@/env";

export async function DashboardLink() {
    let role = ""
    let userID = ""

    const supabase = await createClient()

    const session = await supabase.auth.getSession()

    const url = env.NEXT_PUBLIC_API_URL

    if (session.data.session) {
        userID = session.data.session.user.id

        const res = await fetch(`${url}/account/role/${userID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.data.session.access_token}`,
            },
        });

        if (!res.ok) {
            console.warn("metadata fetch failed:", res.status, await res.text());
            throw new Error("Account not found, account should be setup as RP, Student, or Admin");
        }

        const roleBody = await res.json()

        role = roleBody.role
    }

    if (role == "admin") {
        return (
            <NavigationMenuItem>
                <Link href={"/admin-dashboard"} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Admin Dashboard
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
        )
    }

    if (role == "company") {
        return (
            <NavigationMenuItem>
                <Link href={"/company/" + userID} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Your Company Profile
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
        )
    }

    if (role == "student") {
        return (
            <NavigationMenuItem>
                <Link href={"/student/" + userID} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Your Profile
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
        )
    }
}
