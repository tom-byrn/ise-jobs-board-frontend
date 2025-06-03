// /app/rp-dashboard/layout.tsx
import React from "react";
import AuthGuard from "@/components/auth/auth-guard";

export const metadata = {
  title: "Recruiter Panel",
};

export default async function RpDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRoles={["company"]}>
        {children}
    </AuthGuard>
  );
}
