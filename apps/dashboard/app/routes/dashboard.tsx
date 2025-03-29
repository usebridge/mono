import { useQuery } from "@rocicorp/zero/react";
import { createFileRoute } from "@tanstack/react-router";
import { useZero } from "~/hooks/use-zero";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const z = useZero();
  const [properties] = useQuery(z.query.property);
  console.log(properties);
  console.log(z);
  return <div>Hello "/dashboard"!</div>;
}
