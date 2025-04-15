import {
  LogoLight,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
} from "@ho/ui";
import type { LinkOptions } from "@tanstack/react-router";
import {
  Boxes,
  Calendar,
  Github,
  Home,
  LucideListFilter,
  PersonStanding,
  Send,
  Settings2,
} from "lucide-react";
import type * as React from "react";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

export type NavData = {
  navMain: {
    title: string;
    url: LinkOptions["to"];
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    isActive?: boolean;
    items?: NavData["navMain"];
  }[];
  navSecondary: {
    title: string;
    // TODO: Would be nice for this to still allow intellisense on URLs in our app
    url: LinkOptions["to"] | string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }[];
};

const data: NavData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
    },
    {
      title: "Properties",
      url: "/properties",
      icon: Boxes,
    },
    {
      title: "Clients",
      url: "/clients",
      icon: PersonStanding,
    },
    {
      title: "Calendar",
      url: "/calendar",
      icon: Calendar,
    },
    {
      title: "Bookings",
      url: "/bookings",
      icon: LucideListFilter,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/settings/general",
        },
        {
          title: "Account",
          url: "/settings/account",
        },
        {
          title: "Team",
          url: "/settings/team",
        },
        {
          title: "Billing",
          url: "/settings/billing",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "GitHub",
      url: "https://github.com/usebridge",
      icon: Github,
    },
    {
      title: "Support",
      url: "mailto:support@usebridge.co.uk",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex gap-1 items-end">
            <LogoLight width={42} height={42} transparent />
            <div className="flex flex-col">
              <h1 className="text-teal-700 text-lg font-semibold m-0 leading-6">
                Bridge
              </h1>
              <span className="text-xs text-gray-700">Enterprise Platform</span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator className="my-4" />
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarSeparator className="my-4" />
      <SidebarFooter>
        <NavUser
          user={{
            name: "Ryan Harman",
            email: "ryan@usebridge.co.uk",
            avatar: "https://avatars.githubusercontent.com/u/60135756?v=4",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
