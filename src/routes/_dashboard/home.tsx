import Card from '@/components/iu/card/Card'
import { createFileRoute } from '@tanstack/react-router'
import { User } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/home')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Card
        title='Users'
        count={4}
        icon={User}
      />
    </div>
  )
}
