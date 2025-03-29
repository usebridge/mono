import { schema } from "@ho/zero-schema";
import { Zero } from "@rocicorp/zero";
import { ZeroProvider } from "@rocicorp/zero/react";
import { StartClient } from "@tanstack/start";
import { hydrateRoot } from "react-dom/client";
import { createRouter } from "./router";
/// <reference types="vinxi/types/client" />

const router = createRouter();

const ClientRoot = () => {
  const z = new Zero({
    userID: "userID",
    auth: () => "",
    server: import.meta.env.VITE_PUBLIC_SERVER,
    schema,
    kvStore: "mem",
  });

  return (
    <ZeroProvider zero={z}>
      <StartClient router={router} />
    </ZeroProvider>
  );
};

hydrateRoot(document, <ClientRoot />);
