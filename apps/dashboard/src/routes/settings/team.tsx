import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/team')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/settings/team"!</div>
}
