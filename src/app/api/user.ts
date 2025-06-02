import { createClient } from "@/lib/server";
import { env } from "@/env";

export async function getRole() {
    let role = "";
    let userID = "";

    const supabase = await createClient();

    const session = await supabase.auth.getSession();

    const url = env.NEXT_PUBLIC_API_URL;

    if (session.data.session) {
        userID = session.data.session.user.id;

        const res = await fetch(`${url}/account/role/${userID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.data.session.access_token}`,
            },
        });

        if (!res.ok) {
            console.warn(
                "metadata fetch failed:",
                res.status,
                await res.text(),
            );
            return;
        }

        const roleBody = await res.json();

        role = roleBody.role;
        return role;
    }
    return null
}

export async function getUserId() {
    const supabase = await createClient();
    let userId: string

    const session = await supabase.auth.getSession();

    const url = env.NEXT_PUBLIC_API_URL;

    if (session.data.session) {
        userId = session.data.session.user.id;
        return userId
    }

    return null //No user id found
}
