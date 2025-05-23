"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import ISE_UL_LOGO from "/public/ise-ul-logo.png";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ThemeSwapButton } from "../theming/theme-swap-button";

export function PcNavbar() {
  return (
    <div className="max-w-screen fixed z-50 hidden w-screen flex-row items-center border-b-2 border-neutral-900/20 p-3 font-mono tracking-tight backdrop-blur-sm dark:border-neutral-100/10 md:flex">
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
            <NavigationMenuTrigger>Course Details</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[500px] lg:w-[650px] lg:grid-cols-3">
                <li className="row-span-3 min-w-48">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full rounded-md w-full select-none flex-col justify-end bg-gradient-to-b from-neutral-100 to-neutral-200/80 p-6 no-underline outline-none focus:shadow-md dark:from-neutral-800/80 dark:to-neutral-900"
                      href="/course-details/why-choose-ise"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Why Choose ISE?
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Find out more about the student journey.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="The Specifics">
                  Details about Immersive Software Engineering.
                </ListItem>
                <ListItem href="/docs/installation" title="Entrance Submission">
                  More info about our novel way of assessing candidates.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Residencies">
                  Get more insight into our ground-breaking residency system.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="FAQ">
                  Answers to some common questions from applicants.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Partner With Us</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>


          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Meet The Team
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                News and Events
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>

      <div className="ml-auto mr-4">
        <ThemeSwapButton />
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
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
