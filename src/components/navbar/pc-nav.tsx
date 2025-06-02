import Link from "next/link";
import Image from "next/image";

import ISE_UL_LOGO from "/public/ise-ul-logo.png";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ThemeSwapButton } from "../theming/theme-swap-button";
import LoginLogoutButton from "./login-logout-button";
import { forwardRef } from "react";
import { DashboardLink } from "./dashboard-link";


export function PcNavbar() {
  return (
    <div className="max-w-screen bg-white dark:bg-black fixed z-50 hidden w-screen flex-row items-center border-b-2 border-neutral-900/20 p-3 font-mono tracking-tight backdrop-blur-sm dark:border-neutral-100/10 md:flex">
      <Link href="/">
        <Image
          src={ISE_UL_LOGO}
          width={200}
          alt="The ISE and University of Limerick logos, side-by-side."
          className="mr-6 invert dark:invert-0" />
      </Link>
      <NavigationMenu className="">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/job-postings" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Job Postings
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <DashboardLink />

        </NavigationMenuList>
      </NavigationMenu>


      <div className="ml-auto mr-4 flex items-center" suppressHydrationWarning>
        <ThemeSwapButton />
        <LoginLogoutButton />
      </div>
    </div>
  );
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href=""
          className={cn(
            "block select-none space-y-1 p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
