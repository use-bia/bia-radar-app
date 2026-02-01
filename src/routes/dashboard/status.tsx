import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/status')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/status"!</div>
}
