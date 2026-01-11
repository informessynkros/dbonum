import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/activate-account')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/activate-account"!</div>
}
