import type * as React from "react";
import {
  Boxes,
  Github,
  Home,
  LucideListFilter,
  PersonStanding,
  Send,
  Settings2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  LogoLight,
  SidebarSeparator,
} from "@ho/ui";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

const data = {
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
      title: "Bookings",
      url: "/bookings",
      icon: LucideListFilter,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
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
      title: "Contact",
      url: "mailto:support@usebridge.com",
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
            email: "ryan@usebridge.com",
            avatar: "https://avatars.githubusercontent.com/u/60135756?v=4",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
