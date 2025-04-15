import { SidebarProvider } from "@ho/ui";
import "@ho/ui/globals.css";
import { schema } from "@ho/zero-schema";
import { Zero } from "@rocicorp/zero";
import { ZeroProvider } from "@rocicorp/zero/react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { GlobalCmdInput } from "~/components/global-cmd";
import { AppSidebar } from "~/components/navbar/navbar";

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
  }),
  component: RootComponent,
});

function RootComponent() {
  const z = new Zero({
    userID: "userID",
    auth: () => "",
    server: import.meta.env.VITE_PUBLIC_SERVER,
    schema,
    kvStore: "mem",
  });

  return (
    <>
      <ZeroProvider zero={z}>
        <SidebarProvider>
          <AppSidebar />
          <main className="p-4 bg-background flex-1">
            <GlobalCmdInput />
            <Outlet />
          </main>
        </SidebarProvider>
      </ZeroProvider>
      <TanStackRouterDevtools />
    </>
  );
}
