import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import * as TanStackQueryProvider from './integrations/tanstack-query/root-provider.tsx'
// Import the generated route tree
import { routeTree } from './routeTree.gen'
import './styles.css'
import reportWebVitals from './reportWebVitals.ts'

// Create a new router instance

const TanStackQueryProviderContext = TanStackQueryProvider.getContext()
const router = createRouter({
  routeTree, // Arbol de rutas auto-generado
  context: { // Contexto compartido
    ...TanStackQueryProviderContext,
  },
  defaultPreload: 'intent', // Precargar al hover
  scrollRestoration: true, // Restaurar scroll al navegar
  defaultStructuralSharing: true, // Optimización de Query
  defaultPreloadStaleTime: 0, // Tiempo antes de revalidar
})

// 1. Le decimos a TypeScript cual será su router específico.
// 2. Autocompletado de rutas
// 3. Detecta errores si se usa una ruta que no existe
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
        {/* Antes era App, ahora el corazón es: Router (rutas) */}
        <RouterProvider router={router} />
      </TanStackQueryProvider.Provider>
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
