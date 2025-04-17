import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/join-waiting-list/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/join-waiting-list/"!</div>
}
