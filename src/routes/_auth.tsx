import { useAuthStore } from '@/store/stores/authStore'
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState()
    
    // Si ya está autenticado, no puede regresar a login
    if (isAuthenticated) {
      throw redirect({ to: '/home' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='min-h-screen'>
      <Outlet />
    </div>
  )
}
