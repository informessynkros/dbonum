import Navbar from '@/components/iu/navbar/Navbar'
import Sidebar from '@/components/iu/sidebar/Sidebar'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
    <div className='relative h-screen bg-background overflow-hidden'>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <Sidebar />

      <div className="ml-32 h-full flex flex-col">
        <div className="h-20" />

        <main className="flex-1 overflow-y-auto px-8 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
