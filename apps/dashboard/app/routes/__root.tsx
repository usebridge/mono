import { SidebarProvider } from "@ho/ui";
import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";
import type { ReactNode } from "react";
import { AppSidebar } from "../../components/navbar/navbar";

import CSS from "@ho/ui/globals.css?url";
import { GlobalCmdInput } from "~/components/global-cmd";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Bridge",
      },
      {
        name: "description",
        content: "Bridge the gap to automated viewings.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: CSS,
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <Meta />
      </head>
      <body className="font-inter">
        <SidebarProvider>
          <AppSidebar />
          <main className="p-4 bg-background flex-1">
            <GlobalCmdInput />
            {children}
          </main>
        </SidebarProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
